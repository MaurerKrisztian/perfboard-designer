import type {BoardType} from "../project-file/project-file";

// Counting which features get used, as Google Analytics (GA4) events, through the site's consent
// banner (assets/consent.js: loaded by the page's own script tag, not bundled). It sends an event
// only while the visitor allows analytics; nothing when they don't, before they've chosen, or when
// the banner didn't load. On a dev server it logs them to the console instead.
//
// Every event is listed here. They say which feature was used, never what's on the board: no
// project, part or file names, values, notes or links, as the banner promises ("your boards are
// never sent"). Parameters are short fixed words, and each needs registering in GA4 as an
// event-scoped custom dimension (same name) to show in its reports.

export type ExportFormat =
  | "project" // a project file (.json): File › Save Project to File, or a project's card
  | "png" // File › Download Image
  | "svg" // File › Download SVG
  | "pdf" // File › Export PDF
  | "parts_csv" // File › Component List › Download CSV
  | "parts_print" // File › Component List › PDF / Print
  | "custom_parts" // File › Export Custom Parts
  | "3d_model" // the 3D view's Export 3D (.glb)
  | "3d_png"; // the 3D view's Screenshot

// What kind of part of their own the user made: an IC or a dual-row dev board (the IC editor), a
// module with pins anywhere, or a built-in part's package with its own pinout.
export type CustomPartKind = "ic" | "dev_board" | "module" | "package";

export type UsageEvent =
  | {name: "export"; export_format: ExportFormat}
  // The Share dialog: the full link copied, or a short link made.
  | {name: "share"; method: "full_link" | "short_link"}
  // A share link opened in the editor, by the kind of link: z= / json= (the board in the link),
  // src= (a file elsewhere) or p= (a short link).
  | {name: "open_shared_link"; link_type: "z" | "json" | "src" | "p"}
  // A project file opened: picked (File › Import Project from File, or the Projects dialog) or
  // dropped on the page.
  | {name: "import_project"; import_from: "picker" | "drop"}
  | {name: "import_custom_parts"}
  // A new project from the Projects dialog (not the empty one made when there are none).
  | {name: "new_project"; board_type: BoardType}
  // The empty board's card: start from scratch, open the example, or design it with AI.
  | {name: "empty_board_choice"; start_choice: "scratch" | "example" | "ai"}
  | {name: "open_3d_view"}
  | {name: "view_solder_side"}
  // A Board section switch to the other board type.
  | {name: "switch_board"; board_type: BoardType}
  // A part placed from the catalog: its definition's id ("resistor", "ne555"…), "custom" for a
  // custom module or package part, "custom_ic" for a custom chip or dev board.
  | {name: "place_part"; part_id: string}
  | {name: "create_custom_part"; part_kind: CustomPartKind}
  | {name: "edit_custom_part"; part_kind: CustomPartKind}
  // The Nets panel's Required connections: the board's wiring copied in, a net being added or one
  // being changed.
  | {name: "edit_required_nets"; required_action: "copy_wiring" | "add_net" | "edit_net"}
  // The tour, opened at a chapter by itself on the first visit or from Help, and each chapter
  // watched to its last slide.
  | {name: "tour_open"; tour_chapter: string; opened_by: "first_visit" | "help"}
  | {name: "tour_finish"; tour_chapter: string};

declare global {
  interface Window {
    // assets/consent.js's banner, when it loaded.
    perfboardConsent?: {
      open: () => void;
      event?: (name: string, params: Record<string, string>) => void;
    };
  }
}

export function reportUsage({name, ...params}: UsageEvent) {
  try {
    window.perfboardConsent?.event?.(name, params);
  } catch (err) {
    // Counting must never get in the way of what was counted.
    console.error(err);
  }
}
