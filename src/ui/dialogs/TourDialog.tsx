import {KeyboardEvent, useEffect, useRef, useState} from "react";
import {Modal} from "../components/Modal";
import {usePhoneLayout} from "../hooks/use-media-query";
import {readStored, writeStored} from "../lib/local-storage";
import {cx} from "../lib/class-names";
import {openDialog} from "./dialog-store";

// The tour: three chapters of slides, each a short looping clip of the editor and a line or two on
// what it shows, stepped through with Next. "The basics" opens by itself on a visitor's first visit
// (showTourOnFirstVisit) and ends by offering "How boards work": what joins what (wires, solder
// paths, strips), the board's two sides and editing. That ends by offering "More features", one
// slide each. Help opens any chapter.
//
// The clips are assets/tour/*.mp4, recorded from scenes in tools/demo-video/scenes/tour/ of the
// same names: after a change to what one shows, record it again (tools/demo-video/README.md).

const SEEN_KEY = "tour_seen";

interface Slide {
  title: string;
  clip: string;
  text: string;
  // The same for a phone, where it's taps and the bottom toolbar.
  touch?: string;
}

export type TourChapterId = "basics" | "concepts" | "features";

const CHAPTERS: {id: TourChapterId; name: string; slides: Slide[]}[] = [
  {
    id: "basics",
    name: "The basics",
    slides: [
      {
        title: "Welcome to Perfboard Designer",
        clip: "welcome",
        text: "Plan a circuit on a virtual perfboard or stripboard before you pick up the soldering iron. "
          + "This short tour shows you the basics.",
      },
      {
        title: "Add parts",
        clip: "parts",
        text: "Type a part's name in the Parts search on the left, pick it, then click the board where it goes. "
          + "A resistor or an LED takes two clicks, one for each lead.",
        touch: "Tap Add at the bottom, pick a part, then tap the board where it goes. "
          + "A resistor or an LED takes two taps, one for each lead.",
      },
      {
        title: "Connect them with wires",
        clip: "wires",
        text: "Press W for the wire tool, click one pin, then the other. Click empty holes on the way to bend the wire. "
          + "Dragging from one hole to another draws a wire too.",
        touch: "Tap Wire at the bottom, tap one pin, then the other. Tap empty holes on the way to bend the wire.",
      },
      {
        title: "Check your connections",
        clip: "nets",
        text: "The Nets panel on the right lists which pins are joined. Click a net to light it up on the board, "
          + "and look out for pins that aren't connected to anything.",
        touch: "Tap Nets at the bottom to see which pins are joined. Tap a net to light it up on the board, "
          + "and look out for pins that aren't connected to anything.",
      },
      {
        title: "See it in 3D",
        clip: "view3d",
        text: "Press 3D view at the top to see the board as it will look, and drag to turn it round.",
        touch: "Tap the 3D button at the top to see the board as it will look, and drag to turn it round.",
      },
      {
        title: "Save and share",
        clip: "save-share",
        text: "Your boards save themselves in this browser. Share makes a link that opens a copy for anyone, "
          + "and the File menu saves the project, an image or a PDF.",
      },
    ],
  },
  {
    id: "concepts",
    name: "How boards work",
    slides: [
      {
        title: "A wire joins only its two ends",
        clip: "wires-join",
        text: "Wires are insulated jumpers on top of the board. Where one crosses another wire, or passes over a hole, "
          + "it goes over without touching: these two wires make two separate nets. To join wires, end them in the same hole.",
      },
      {
        title: "A solder path joins every hole it covers",
        clip: "solder-paths",
        text: "Press S for a solder path: a trail of solder on the copper side, bridging pad to pad. Unlike a wire, "
          + "it joins every hole it runs over, so another path or a pin can join it anywhere along it.",
        touch: "Tap Solder at the bottom for a solder path: a trail of solder on the copper side, bridging pad to pad. "
          + "Unlike a wire, it joins every hole it runs over, so another path or a pin can join it anywhere along it.",
      },
      {
        title: "Turn the board over to solder",
        clip: "solder-side",
        text: "Solder side (or B) shows the board from below, mirrored the way it looks in your hand with the copper "
          + "side up. Every hole you need to solder is marked, so you can work through them one by one.",
        touch: "Solder side shows the board from below, mirrored the way it looks in your hand with the copper side up. "
          + "Every hole you need to solder is marked, so you can work through them one by one.",
      },
      {
        title: "Put a wire on the back",
        clip: "wire-back",
        text: "Select a wire and choose To solder side to run it under the board. It still joins its two ends, "
          + "but it no longer crosses the wires on top. It shows faded from the top and in full from the solder side.",
        touch: "Select a wire and tap To solder side to run it under the board. It still joins its two ends, "
          + "but it no longer crosses the wires on top. It shows faded from the top and in full from the solder side.",
      },
      {
        title: "Stripboard: strips and cuts",
        clip: "strips-cuts",
        text: "On a stripboard, a copper strip joins every hole along it, so parts on one strip are connected without "
          + "a wire. Here both leads of the resistor are shorted. The Cut tool breaks the strip at a hole to part them.",
      },
      {
        title: "Move, rotate and undo",
        clip: "edit-parts",
        text: "Drag a part to move it. R rotates the selected part, Delete removes it, and Ctrl+Z and Ctrl+Y "
          + "undo and redo. Right-click anything for everything you can do to it.",
        touch: "Drag a part to move it. Tap a part for a bar of what you can do to it: rotate, delete and more. "
          + "Long-press anything for its menu.",
      },
    ],
  },
  {
    id: "features",
    name: "More features",
    slides: [
      {
        title: "Bend a wire you've drawn",
        clip: "reshape-wire",
        text: "Click a wire to see its handles. Drag it anywhere along its length to pull out a bend, drag a bend "
          + "to move it, and Straighten takes the bends out again.",
        touch: "Tap a wire to see its handles. Drag it anywhere along its length to pull out a bend, drag a bend "
          + "to move it, and Straighten takes the bends out again.",
      },
      {
        title: "Select several and copy them",
        clip: "multi-select",
        text: "Hold Shift and drag a box round parts and wires to select them all. Ctrl+D puts a copy beside them, "
          + "Ctrl+C and Ctrl+V copy and paste, and dragging one of them moves them all.",
        touch: "Tap Select more in the bar along the bottom, then tap parts and wires to add them. Duplicate puts "
          + "a copy beside them, and dragging one of them moves them all.",
      },
      {
        title: "Values and colours",
        clip: "values-colors",
        text: "Select a resistor and choose Value to set it, such as 4.7k: its colour bands follow. "
          + "An LED's Color picks red, green and the rest.",
        touch: "Tap a resistor and choose Value to set it, such as 4.7k: its colour bands follow. "
          + "An LED's Color picks red, green and the rest.",
      },
      {
        title: "Notes on holes",
        clip: "notes",
        text: "The Note tool writes a note on a hole, such as where the battery goes; point at the hole to read it. "
          + "A note naming a supply, like +9V or GND, also tells the checks where your power comes in.",
        touch: "The Note tool, under More, writes a note on a hole, such as where the battery goes. "
          + "A note naming a supply, like +9V or GND, also tells the checks where your power comes in.",
      },
      {
        title: "Spot parts in backwards",
        clip: "polarity",
        text: "When an LED, a diode or an electrolytic capacitor sits the wrong way round between the supply rails, "
          + "the Nets panel lists it under Looks backwards. Turn round swaps its leads.",
      },
      {
        title: "Check the board against your plan",
        clip: "required-nets",
        text: "Required connections, in the Nets panel, holds the connections you mean to make: click their pins "
          + "on the board, or copy in the board's wiring. Each one is ticked once it's wired, so a missing one stands out.",
        touch: "Required connections, in the Nets panel, holds the connections you mean to make: tap their pins "
          + "on the board, or copy in the board's wiring. Each one is ticked once it's wired, so a missing one stands out.",
      },
      {
        title: "Make your own parts",
        clip: "custom-part",
        text: "Missing a part? Custom part… at the top of the parts list makes a module, a chip or a part in a "
          + "package the library has: name it, click its pins, save it and place it.",
        touch: "Missing a part? Custom part… at the top of the parts list makes a module, a chip or a part in a "
          + "package the library has: name it, tap its pins, save it and place it.",
      },
      {
        title: "Parts list and PDF",
        clip: "parts-list-pdf",
        text: "File › Component List lists every part with its value, to order or tick off. File › Export PDF "
          + "makes one document of the project: the board from both sides, the parts and the checks.",
      },
    ],
  },
];

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

// Opens the tour once, on the first visit to the editor.
export function showTourOnFirstVisit() {
  if (!readStored(SEEN_KEY, false)) openDialog({kind: "tour", chapter: "basics"});
}

export function TourDialog({chapter: firstChapter, onClose}: {chapter: TourChapterId; onClose: () => void}) {
  const [place, setPlace] = useState({chapter: Math.max(0, CHAPTERS.findIndex(c => c.id === firstChapter)), index: 0});
  const phone = usePhoneLayout();
  const next = useRef<HTMLButtonElement>(null);
  const chapter = CHAPTERS[place.chapter];
  const slide = chapter.slides[place.index];
  const lastSlide = place.index === chapter.slides.length - 1;
  const nextChapter = CHAPTERS[place.chapter + 1];
  const still = reducedMotion();

  // Shown once is seen: it doesn't open by itself again, however it's closed.
  useEffect(() => writeStored(SEEN_KEY, true), []);
  useEffect(() => next.current?.focus(), [place]);

  const go = (index: number) => setPlace({...place, index: Math.max(0, Math.min(chapter.slides.length - 1, index))});
  const openChapter = (i: number) => setPlace({chapter: i, index: 0});
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(place.index + 1);
    else if (e.key === "ArrowLeft") go(place.index - 1);
    else return;
    e.preventDefault();
  };

  return (
    <Modal title="Tour" className="tour-card" onClose={onClose}>
      <div className="tour" onKeyDown={onKeyDown}>
        <div className="tour-chapters" role="tablist" aria-label="Chapters">
          {CHAPTERS.map((c, i) => (
            <button key={c.id} type="button" role="tab" aria-selected={i === place.chapter}
              className={cx("tour-chapter", i === place.chapter && "is-active")} onClick={() => openChapter(i)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="tour-media">
          <video key={slide.clip} src={`../tour/${slide.clip}.mp4`} poster={`../tour/${slide.clip}.webp`} aria-label={slide.title}
            autoPlay={!still} controls={still} muted loop playsInline preload="auto"/>
        </div>
        <div className="modal-body tour-body">
          <div className="tour-step">Step {place.index + 1} of {chapter.slides.length}</div>
          <h2 className="tour-title">{slide.title}</h2>
          <p className="tour-text">{(phone && slide.touch) || slide.text}</p>
          {lastSlide && !nextChapter && (
            <p className="tour-again">You can watch the tour again any time from the Help menu.</p>
          )}
        </div>
        <div className="modal-footer tour-footer">
          <div className="tour-dots">
            {chapter.slides.map((s, i) => (
              <button key={s.clip} type="button" className={cx("tour-dot", i === place.index && "is-active")}
                aria-label={`Step ${i + 1}: ${s.title}`} aria-current={i === place.index ? "step" : undefined} onClick={() => go(i)}/>
            ))}
          </div>
          {!lastSlide && <button type="button" className="btn-quiet" onClick={onClose}>Skip</button>}
          {place.index > 0 && <button type="button" onClick={() => go(place.index - 1)}>Back</button>}
          {lastSlide && nextChapter && <button type="button" onClick={onClose}>Start designing</button>}
          {lastSlide && nextChapter ? (
            <button ref={next} type="button" className="btn-accent" onClick={() => openChapter(place.chapter + 1)}>
              Next: {nextChapter.name.toLowerCase()}
            </button>
          ) : (
            <button ref={next} type="button" className="btn-accent" onClick={lastSlide ? onClose : () => go(place.index + 1)}>
              {lastSlide ? "Start designing" : "Next"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
