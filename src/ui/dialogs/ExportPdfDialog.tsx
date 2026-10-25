import {useState} from "react";
import {ProjectState} from "../../state/ProjectState";
import {getSaveJson} from "../../features/project/save-project";
import {exportProjectPdf, PDF_SECTIONS, PdfSection} from "../../features/project/project-document";
import {Paper, PAPERS, regionalPaper} from "../../features/project/print-style";
import {SegmentedControl} from "../components/SegmentedControl";
import {Modal} from "../components/Modal";
import {readStored, writeStored} from "../lib/local-storage";
import {partInfo} from "../nets/part-info";

// File › Export PDF: pick what the project PDF holds (project-document.ts makes it) and its paper,
// then print it, where the browser's "Save as PDF" saves it. Both are remembered for next time.

const STORAGE_KEY = "pdf_sections";
const PAPER_KEY = "pdf_paper";
const PAPER_OPTIONS = (Object.keys(PAPERS) as Paper[]).map(paper => ({value: paper, label: PAPERS[paper].label}));

function storedPaper(): Paper {
  const stored = readStored<unknown>(PAPER_KEY, regionalPaper());
  return stored === "a4" || stored === "letter" ? stored : regionalPaper();
}
const DEFAULT_SECTIONS: PdfSection[] = ["overview", "board", "components", "shopping", "nets", "checks"];

const isSection = (value: unknown): value is PdfSection => PDF_SECTIONS.some(section => section.id === value);

function storedSections(): PdfSection[] {
  const stored = readStored<unknown>(STORAGE_KEY, DEFAULT_SECTIONS);
  return Array.isArray(stored) ? stored.filter(isSection) : DEFAULT_SECTIONS;
}

export function ExportPdfDialog({onClose}: {onClose: () => void}) {
  const [chosen, setChosen] = useState(() => new Set(storedSections()));
  const [paper, setPaper] = useState(storedPaper);
  const [busy, setBusy] = useState(false);

  const toggle = (id: PdfSection) => setChosen(current => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  const exportPdf = async () => {
    const sections = PDF_SECTIONS.map(section => section.id).filter(id => chosen.has(id));
    writeStored(STORAGE_KEY, sections);
    writeStored(PAPER_KEY, paper);
    const project = getSaveJson();
    setBusy(true);
    try {
      await exportProjectPdf({
        project,
        name: ProjectState.current?.name?.trim() || "Perfboard project",
        sections,
        paper,
        iconFor: ref => partInfo(project).get(ref)?.icon,
      });
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="Export PDF" className="pdf-card" onClose={onClose}>
      <div className="modal-body">
        <p className="share-note">One document about the project, for the bench, a friend or your notes. Pick what goes in it:</p>
        <div className="pdf-sections" role="group" aria-label="What the PDF holds">
          {PDF_SECTIONS.map(section => (
            <label key={section.id} className={chosen.has(section.id) ? "pdf-section is-on" : "pdf-section"}>
              <input type="checkbox" checked={chosen.has(section.id)} onChange={() => toggle(section.id)}/>
              <span className="pdf-section-text">
                <strong>{section.label}</strong>
                <span>{section.description}</span>
              </span>
            </label>
          ))}
        </div>
        <div className="pdf-paper">
          <span>Paper</span>
          <SegmentedControl id="pdfPaperSwitch" options={PAPER_OPTIONS} value={paper} onChange={setPaper}/>
        </div>
      </div>
      <div className="modal-footer projects-footer">
        <span className="projects-footer-hint">Opens your browser's print dialog: choose <strong>Save as PDF</strong> as the printer.</span>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn-primary" disabled={!chosen.size || busy} onClick={() => void exportPdf()}>Export PDF</button>
      </div>
    </Modal>
  );
}
