import "./viewer-3d.css";
import {
  ACESFilmicToneMapping, Color, DirectionalLight, HemisphereLight, Material, Mesh, Object3D,
  PCFSoftShadowMap, PerspectiveCamera, PMREMGenerator, Scene, Texture, Vector3, WebGLRenderer,
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment.js";
import {readProject} from "./project-data";
import {buildBoardScene, BuiltBoard} from "./build-scene";
import {exportGlb} from "./export-model";

// Read-only 3D view of a perfboard project. It only ever receives project-file data (the
// same JSON "Save Project" writes) - never the editor's live state - and is loaded on demand,
// so three.js stays out of the editor's main bundle.

type ViewName = "angled" | "top" | "bottom";

const VIEW_DIRECTIONS: Record<ViewName, Vector3> = {
  angled: new Vector3(0.35, 0.82, 0.75).normalize(),
  // A hair off the pole so OrbitControls keeps a stable "up" when looking straight down/up.
  top: new Vector3(0, 1, 0.02).normalize(),
  bottom: new Vector3(0, -1, 0.02).normalize(),
};

const TWEEN_MS = 450;

function disposeTree(root: Object3D) {
  const textures = new Set<Texture>();
  const materials = new Set<Material>();
  root.traverse(object => {
    const mesh = object as Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) materials.add(material);
  });
  for (const material of materials) {
    const slots = material as unknown as Record<string, unknown>;
    for (const key of Object.keys(slots)) {
      const value = slots[key];
      if (value instanceof Texture) textures.add(value);
    }
    material.dispose();
  }
  textures.forEach(texture => texture.dispose());
}

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, text?: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  if (text) el.textContent = text;
  return el;
}

// The toolbar's line icons (24-unit paths), drawn in the text colour.
const ICONS = {
  download: ["M12 3v12", "m7 10 5 5 5-5", "M5 21h14"],
  camera: ["M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z", "M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"],
  folder: ["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"],
  close: ["M18 6 6 18", "M6 6l12 12"],
};

function icon(paths: string[]): SVGSVGElement {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("viewer3d-icon");
  for (const d of paths) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  }
  return svg;
}

const VIEW_LABELS: Record<ViewName, string> = {angled: "Angled", top: "Top", bottom: "Bottom"};

class Viewer3d {
  private readonly overlay = element("div", "viewer3d-overlay");
  private readonly host = element("div", "viewer3d-canvas-host");
  private readonly status = element("span", "viewer3d-status");
  private readonly viewButtons = new Map<ViewName, HTMLButtonElement>();
  private readonly renderer = new WebGLRenderer({antialias: true});
  private readonly scene = new Scene();
  // A tight near/far range keeps depth precision high enough for the thin printed-on layers
  // (bands, stripes, pads) not to flicker against what they sit on; far is refit per board.
  private readonly camera = new PerspectiveCamera(38, 1, 2, 2000);
  private readonly controls: OrbitControls;
  private readonly sun = new DirectionalLight("#ffffff", 2.4);
  private readonly resizeObserver: ResizeObserver;
  private board?: BuiltBoard;
  private frameId = 0;
  private needsRender = true;
  private readonly previousBodyOverflow = document.body.style.overflow;
  private tween?: {fromPos: Vector3; toPos: Vector3; fromTarget: Vector3; toTarget: Vector3; start: number};

  constructor(private readonly onClosed: () => void) {
    this.buildDom();

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.host.appendChild(this.renderer.domElement);

    this.scene.background = new Color("#0b1411");
    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;
    pmrem.dispose();
    this.scene.add(new HemisphereLight("#dfe9ff", "#1a2230", 0.7));
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.04;
    this.scene.add(this.sun, this.sun.target);
    // Soft light from underneath so the solder side isn't pitch black in the bottom view.
    const under = new DirectionalLight("#cfd8e6", 0.8);
    under.position.set(-0.4, -1, -0.3);
    this.scene.add(under);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.12;
    this.controls.addEventListener("start", () => {
      this.tween = undefined;
      // Turned by hand: no longer one of the preset views.
      for (const btn of this.viewButtons.values()) {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      }
    });
    this.controls.addEventListener("change", () => { this.needsRender = true; });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.host);
    window.addEventListener("keydown", this.onKey, true);
    window.addEventListener("keyup", this.swallowKey, true);

    this.loop();
  }

  // A toolbar along the top (title, then screenshot, 3D export, open and close), and the view switch floating
  // over the bottom of the board, where a thumb reaches it.
  private buildDom() {
    const toolbar = element("div", "viewer3d-toolbar");
    const title = element("div", "viewer3d-title", "3D View");
    title.appendChild(this.status);
    toolbar.appendChild(title);

    const actions = element("div", "viewer3d-actions");
    const button = (label: string, paths: string[], onClick: () => void, extraClass = "") => {
      const btn = element("button", `viewer3d-btn ${extraClass}`.trim());
      btn.type = "button";
      btn.title = label;
      btn.setAttribute("aria-label", label);
      btn.append(icon(paths), element("span", "viewer3d-btn-label", label));
      btn.addEventListener("click", onClick);
      actions.appendChild(btn);
      return btn;
    };
    button("Screenshot", ICONS.camera, () => this.screenshot());
    button("Export 3D", ICONS.download, () => void this.exportModel());

    const fileInput = element("input", "viewer3d-file");
    fileInput.type = "file";
    fileInput.accept = ".json,application/json";
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      fileInput.value = "";
      if (!file) return;
      file.text().then(text => this.load(JSON.parse(text))).catch(() => this.showError("Couldn't read that file as a project."));
    });
    actions.appendChild(fileInput);
    button("Open file…", ICONS.folder, () => fileInput.click());
    button("Close", ICONS.close, () => this.close(), "viewer3d-btn-close");
    toolbar.appendChild(actions);

    const views = element("div", "viewer3d-views");
    views.setAttribute("role", "group");
    views.setAttribute("aria-label", "View");
    for (const view of Object.keys(VIEW_LABELS) as ViewName[]) {
      const btn = element("button", "viewer3d-view", VIEW_LABELS[view]);
      btn.type = "button";
      btn.addEventListener("click", () => this.setView(view));
      views.appendChild(btn);
      this.viewButtons.set(view, btn);
    }
    const touch = matchMedia("(pointer: coarse)").matches;
    const hint = element("div", "viewer3d-hint", touch
      ? "Drag to turn · Pinch to zoom · Two fingers to pan"
      : "Drag to orbit · Right-drag to pan · Scroll to zoom · Esc to close");
    const dock = element("div", "viewer3d-dock");
    dock.append(views, hint);
    this.host.appendChild(dock);
    this.overlay.append(toolbar, this.host);
    document.body.appendChild(this.overlay);
    document.body.style.overflow = "hidden";
  }

  load(raw: unknown) {
    let built: BuiltBoard;
    try {
      built = buildBoardScene(readProject(raw));
    } catch (e) {
      this.showError(e instanceof Error ? e.message : "Couldn't open that project.");
      return;
    }
    if (this.board) {
      this.scene.remove(this.board.root);
      disposeTree(this.board.root);
    }
    this.board = built;
    this.scene.add(built.root);
    this.status.classList.remove("viewer3d-status-error");
    this.status.textContent = `${built.partCount} part${built.partCount === 1 ? "" : "s"} · ${built.wireCount} wire${built.wireCount === 1 ? "" : "s"}`;

    const radius = this.boardRadius();
    const shadow = this.sun.shadow.camera;
    shadow.left = shadow.bottom = -radius * 1.15;
    shadow.right = shadow.top = radius * 1.15;
    shadow.near = 1;
    shadow.far = radius * 6;
    shadow.updateProjectionMatrix();
    this.sun.position.set(radius * 0.6, radius * 2.2, radius * 1.1);
    this.controls.maxDistance = radius * 8;
    this.camera.far = radius * 12;
    this.camera.updateProjectionMatrix();
    this.controls.minDistance = 8;
    // The view is fitted to the window's shape, which the resize observer may not have reported yet.
    this.resize();
    this.setView("angled", false);
  }

  private boardRadius(): number {
    if (!this.board) return 50;
    // Parts stand up to ~20mm proud of the board, so leave room above it too.
    return Math.hypot(this.board.frame.width, this.board.frame.depth) / 2 + 12;
  }

  // Far enough for the board to fill the view: by its height on a wide screen (the 0.62 allows
  // for the board lying flat), and on a tall, narrow phone screen by its width.
  private viewPosition(view: ViewName): Vector3 {
    const radius = this.boardRadius();
    const halfFov = this.camera.fov * Math.PI / 360;
    const halfHorizontalFov = Math.atan(Math.tan(halfFov) * this.camera.aspect);
    const byHeight = radius / Math.sin(halfFov) * 0.62;
    const byWidth = radius / Math.sin(halfHorizontalFov) * 0.62;
    return VIEW_DIRECTIONS[view].clone().multiplyScalar(Math.max(byHeight, byWidth));
  }

  setView(view: ViewName, animate = true) {
    for (const [name, btn] of this.viewButtons) {
      btn.classList.toggle("is-active", name === view);
      btn.setAttribute("aria-pressed", String(name === view));
    }
    const target = new Vector3(0, 0, 0);
    const position = this.viewPosition(view);
    if (!animate) {
      this.tween = undefined;
      this.camera.position.copy(position);
      this.controls.target.copy(target);
      this.controls.update();
      this.needsRender = true;
      return;
    }
    this.tween = {fromPos: this.camera.position.clone(), toPos: position, fromTarget: this.controls.target.clone(), toTarget: target, start: performance.now()};
  }

  private screenshot() {
    this.renderer.render(this.scene, this.camera);
    const link = document.createElement("a");
    link.download = "perfboard-3d.png";
    link.href = this.renderer.domElement.toDataURL("image/png");
    link.click();
  }

  // The board as a .glb file, for other 3D programs (export-model.ts).
  private async exportModel() {
    if (!this.board) return;
    try {
      const url = URL.createObjectURL(await exportGlb(this.board.root));
      const link = document.createElement("a");
      link.download = "perfboard-3d.glb";
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error(e);
      this.showError("Couldn't export the 3D model.");
    }
  }

  private showError(message: string) {
    this.status.classList.add("viewer3d-status-error");
    this.status.textContent = message;
  }

  private resize() {
    const width = this.host.clientWidth, height = this.host.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.needsRender = true;
  }

  private loop = () => {
    this.frameId = requestAnimationFrame(this.loop);
    if (this.tween) {
      const t = Math.min(1, (performance.now() - this.tween.start) / TWEEN_MS);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      this.camera.position.lerpVectors(this.tween.fromPos, this.tween.toPos, eased);
      this.controls.target.lerpVectors(this.tween.fromTarget, this.tween.toTarget, eased);
      if (t >= 1) this.tween = undefined;
      this.needsRender = true;
    }
    // update() applies damping and reports whether the camera actually moved.
    if (this.controls.update()) this.needsRender = true;
    if (!this.needsRender) return;
    this.needsRender = false;
    this.renderer.render(this.scene, this.camera);
  };

  // While the viewer is open, keys must not reach the editor's shortcuts underneath it.
  private onKey = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();
    if (e.key === "Escape") this.close();
  };

  private swallowKey = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();
  };

  close() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener("keydown", this.onKey, true);
    window.removeEventListener("keyup", this.swallowKey, true);
    this.resizeObserver.disconnect();
    this.controls.dispose();
    if (this.board) disposeTree(this.board.root);
    this.scene.environment?.dispose();
    this.renderer.dispose();
    this.overlay.remove();
    document.body.style.overflow = this.previousBodyOverflow;
    this.onClosed();
  }
}

let active: Viewer3d | undefined;

/** Opens the viewer on a project (the parsed JSON of a project file), or shows that project
 *  in the viewer if it's already open. */
export function openViewer3d(project: unknown) {
  if (!active) active = new Viewer3d(() => { active = undefined; });
  active.load(project);
}
