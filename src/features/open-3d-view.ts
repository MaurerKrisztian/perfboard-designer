import {getSaveJson} from "./project/save-project";
import {tell} from "./ask-dialog";
import {reportUsage} from "./analytics";

// The 3D viewer only ever gets a snapshot of the project file (the same JSON "Save Project"
// writes), never live editor state, and is loaded on demand so three.js isn't part of the
// editor's own bundle.
export async function open3dView() {
  const project = JSON.parse(JSON.stringify(getSaveJson()));
  const viewer = await import("../viewer-3d/viewer-3d").catch((err: unknown) => {
    console.error(err);
    return undefined;
  });
  if (!viewer) {
    void tell("Couldn't load the 3D view", "Check your connection and try again.");
    return;
  }
  try {
    viewer.openViewer3d(project, {
      onDownload: what => reportUsage({name: "export", export_format: what === "model" ? "3d_model" : "3d_png"}),
    });
    reportUsage({name: "open_3d_view"});
  } catch (err) {
    // Almost always WebGL: turned off, blocked, or not supported by this browser or device.
    console.error(err);
    void tell("Couldn't start the 3D view", "It needs WebGL, which this browser has turned off or doesn't support: try turning on hardware acceleration in its settings, or another browser.");
  }
}
