import {KeyboardEvent, ReactNode, useState} from "react";
import {boardNets, highlightRequiredPins, pickedNet, toggleNetHighlight} from "../../features/board-nets";
import {comparePins, isPowerNet, Net, NetPin, pinId} from "../../project-file/nets";
import {GridPos} from "../../project-file/grid";
import {useEditor} from "../hooks/use-editor";
import {cx} from "../lib/class-names";
import {RequirementsCard} from "./RequirementsCard";

// The board's nets: which pins it connects, kept up to date as it changes (src/features/board-nets.ts).
// Unconnected pins and wires connecting no pins come first, in folds: they're likely mistakes, and
// below a long list of nets they'd be out of sight. Picking a net, a pin or such wires lights it up
// on the board until it's picked again.

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const hole = ([c, r]: GridPos) => `${c},${r}`;

type Fold = "unconnected" | "stray";

export function NetsPanel() {
  const current = useEditor(boardNets);
  const picked = useEditor(pickedNet);
  const [foldOpen, setFoldOpen] = useState<Record<Fold, boolean>>({unconnected: false, stray: false});

  const nets = current?.nets ?? [];
  const connected = nets.filter(net => net.pins.length > 1);
  const unconnected = nets.filter(net => net.pins.length === 1).sort((a, b) => comparePins(a.pins[0], b.pins[0]));
  const stray = nets.filter(net => !net.pins.length);
  const strayWires = stray.reduce((n, net) => n + net.wires.length, 0);
  const wires = current?.project.wires ?? [];

  const fold = (name: Fold, summary: string, chips: ReactNode[], containsPicked: boolean) => (
    <details className="nets-fold" open={foldOpen[name] || containsPicked}
      onToggle={e => {
        const open = e.currentTarget.open;
        setFoldOpen(state => state[name] === open ? state : {...state, [name]: open});
      }}>
      <summary>{summary}</summary>
      <div className="net-pins">{chips}</div>
    </details>
  );

  return (
    <div className="nets-panel">
      <div className="section-title">Nets <span id="netsCount" className="nets-count">{connected.length || ""}</span></div>
      <div id="nets">
        {current?.project.requirements && <RequirementsCard project={current.project} nets={nets} onInspect={highlightRequiredPins}/>}
        {unconnected.length > 0 && fold("unconnected", `${plural(unconnected.length, "pin")} not connected`,
          unconnected.map(net => (
            <Pickable key={pinId(net.pins[0])} net={net} picked={picked} className="net-pin" title={`${pinTitle(net.pins[0])}: click to show it on the board`}>
              <PinChipContent pin={net.pins[0]}/>
            </Pickable>
          )), unconnected.includes(picked as Net))}
        {stray.length > 0 && fold("stray", `${plural(strayWires, "wire")} connecting no pins`,
          stray.map(net => {
            const {from, to} = wires[net.wires[0]];
            const more = net.wires.length - 1;
            const title = `A wire from column ${from[0]}, row ${from[1]} to column ${to[0]}, row ${to[1]} (counted from 0 at the top-left hole)`
              + (more ? `, joined to ${plural(more, "more wire")} but to no pin` : ", connected to no pin");
            return (
              <Pickable key={net.wires.join()} net={net} picked={picked} className="net-pin" title={`${title}: click to show it on the board`}>
                {`${hole(from)}–${hole(to)}`}
                {more > 0 && <span className="net-pin-label">+{more}</span>}
              </Pickable>
            );
          }), stray.includes(picked as Net))}
        {connected.map(net => <NetRow key={net.pins.map(pinId).join()} net={net} picked={picked}/>)}
        {connected.length === 0 && <div className="nets-empty">Nothing is connected yet. Wire two pins together and their net shows up here.</div>}
      </div>
    </div>
  );
}

function NetRow({net, picked}: {net: Net; picked?: Net}) {
  return (
    <Pickable net={net} picked={picked} className={isPowerNet(net) ? "net power" : "net"}
      title={net === picked ? "Click to stop showing it on the board" : "Click to show it on the board"}>
      <div className="net-head">
        {net.name
          ? <span className="net-name">{net.name}</span>
          : <span className="net-name unnamed">Net ({pinId(net.pins[0])})</span>}
        <span className="net-size">{net.pins.length} pins</span>
      </div>
      <div className="net-pins">
        {net.pins.map(pin => <span key={pinId(pin)} className="net-pin" title={pinTitle(pin)}><PinChipContent pin={pin}/></span>)}
      </div>
    </Pickable>
  );
}

// "U1 pin 8 (VCC)"
function pinTitle(pin: NetPin): string {
  return `${pin.ref} pin ${pin.pin}${pin.label ? ` (${pin.label})` : ""}`;
}

// "D1.K" or "U1.8", with a chip's pin name ("VCC") beside it.
function PinChipContent({pin}: {pin: NetPin}) {
  return (
    <>
      {pinId(pin)}
      {pin.label && pin.kind !== "standard-component" && <span className="net-pin-label">{pin.label}</span>}
    </>
  );
}

// A net's row or chip: picks the net with a click, or Enter or Space when focused.
function Pickable({net, picked, className, title, children}: {net: Net; picked?: Net; className: string; title: string; children: ReactNode}) {
  const isPicked = net === picked;
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggleNetHighlight(net);
  };
  const Tag = className.startsWith("net-pin") ? "span" : "div";
  return (
    <Tag className={cx(className, isPicked && "selected")} title={title} tabIndex={0} role="button" aria-pressed={isPicked}
      onClick={() => toggleNetHighlight(net)} onKeyDown={onKeyDown}>
      {children}
    </Tag>
  );
}
