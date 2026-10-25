import {KeyboardEvent, ReactNode, useState} from "react";
import {boardNets, pickedNet, toggleNetHighlight} from "../../features/board-nets";
import {comparePins, isPowerNet, Net, pinId} from "../../project-file/nets";
import {GridPos} from "../../project-file/grid";
import type {ProjectFile} from "../../project-file/project-file";
import {Icon, IconName} from "../components/Icon";
import {useEditor} from "../hooks/use-editor";
import {useStore} from "../lib/store";
import {cx} from "../lib/class-names";
import {describePin, NetsView, netsViewStore, partInfo, setNetsView} from "./part-info";
import {PinChipContent, PinList, PinRowContent} from "./PinList";
import {RequirementsCard} from "./RequirementsCard";
import {PolarityWarnings} from "./PolarityWarnings";

// The board's nets: which pins it connects, kept up to date as it changes (src/features/board-nets.ts),
// under the optional list of the nets it should have (RequirementsCard). Each pin shows its part's
// icon, and the view is short (a chip per pin) or detailed (a line per pin saying what part and pin
// it is). Parts that look backwards (PolarityWarnings), unconnected pins and wires connecting no
// pins come first, in folds: they're likely mistakes, and below a long list of nets they'd be out
// of sight. Picking a net, a pin or such
// wires lights it up on the board until it's picked again.

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const hole = ([c, r]: GridPos) => `${c},${r}`;

type Fold = "unconnected" | "stray";

const VIEWS: {value: NetsView; label: string; title: string}[] = [
  {value: "short", label: "Short", title: "A chip per pin: \"D1.K\""},
  {value: "detailed", label: "Detailed", title: "A line per pin: its part, value and what the pin is"},
];

const GROUND = /^[ADP]?GND$/i;

// A ground rail, another supply rail, or a signal, by the net's name.
function netIcon(net: Net): IconName | undefined {
  if (!isPowerNet(net)) return undefined;
  return net.name?.split("/").every(name => GROUND.test(name)) ? "ground" : "bolt";
}

export function NetsPanel() {
  const current = useEditor(boardNets);
  const picked = useEditor(pickedNet);
  const view = useStore(netsViewStore, state => state.view);
  const [foldOpen, setFoldOpen] = useState<Record<Fold, boolean>>({unconnected: false, stray: false});

  const nets = current?.nets ?? [];
  const connected = nets.filter(net => net.pins.length > 1);
  const unconnected = nets.filter(net => net.pins.length === 1).sort((a, b) => comparePins(a.pins[0], b.pins[0]));
  const stray = nets.filter(net => !net.pins.length);
  const strayWires = stray.reduce((n, net) => n + net.wires.length, 0);
  const wires = current?.project.wires ?? [];
  const parts = current ? partInfo(current.project) : new Map();

  const fold = (name: Fold, summary: string, items: ReactNode[], containsPicked: boolean) => (
    <details className="nets-fold" open={foldOpen[name] || containsPicked}
      onToggle={e => {
        const open = e.currentTarget.open;
        setFoldOpen(state => state[name] === open ? state : {...state, [name]: open});
      }}>
      <summary>{summary}</summary>
      <div className={view === "detailed" && name === "unconnected" ? "pin-rows" : "net-pins"}>{items}</div>
    </details>
  );

  return (
    <div className="nets-panel">
      <div className="section-title nets-title">
        <span>Nets <span id="netsCount" className="nets-count">{connected.length || ""}</span></span>
        <div className="nets-view" role="group" aria-label="How pins are shown">
          {VIEWS.map(option => (
            <button key={option.value} type="button" className={cx(view === option.value && "is-on")} title={option.title}
              aria-pressed={view === option.value} onClick={() => setNetsView(option.value)}>{option.label}</button>
          ))}
        </div>
      </div>
      <div id="nets">
        {view === "detailed" && connected.length > 0 && (
          <p className="nets-help">A net is a group of pins the board joins together. Click one to light it up on the board.</p>
        )}
        {current && <RequirementsCard project={current.project} nets={nets}/>}
        {current && <PolarityWarnings warnings={current.polarity} project={current.project}/>}
        {unconnected.length > 0 && fold("unconnected", `${plural(unconnected.length, "pin")} not connected`,
          unconnected.map(net => {
            const pin = net.pins[0];
            const part = parts.get(pin.ref);
            return view === "detailed"
              ? <Pickable key={pinId(pin)} net={net} picked={picked} className="pin-row is-pickable" tag="div"
                title={`${describePin(pin, part)}: click to show it on the board`}><PinRowContent pin={pin} part={part}/></Pickable>
              : <Pickable key={pinId(pin)} net={net} picked={picked} className="net-pin" tag="span"
                title={`${describePin(pin, part)}: click to show it on the board`}><PinChipContent pin={pin} part={part}/></Pickable>;
          }), unconnected.includes(picked as Net))}
        {stray.length > 0 && fold("stray", `${plural(strayWires, "wire")} connecting no pins`,
          stray.map(net => {
            const {from, to} = wires[net.wires[0]];
            const more = net.wires.length - 1;
            const title = `A wire from column ${from[0]}, row ${from[1]} to column ${to[0]}, row ${to[1]} (counted from 0 at the top-left hole)`
              + (more ? `, joined to ${plural(more, "more wire")} but to no pin` : ", connected to no pin");
            return (
              <Pickable key={net.wires.join()} net={net} picked={picked} className="net-pin" tag="span" title={`${title}: click to show it on the board`}>
                {`${hole(from)}–${hole(to)}`}
                {more > 0 && <span className="net-pin-label">+{more}</span>}
              </Pickable>
            );
          }), stray.includes(picked as Net))}
        {current && connected.map(net => <NetRow key={net.pins.map(pinId).join()} net={net} picked={picked} project={current.project} view={view}/>)}
        {connected.length === 0 && <div className="nets-empty">Nothing is connected yet. Wire two pins together and their net shows up here.</div>}
      </div>
    </div>
  );
}

function NetRow({net, picked, project, view}: {net: Net; picked?: Net; project: ProjectFile; view: NetsView}) {
  const icon = netIcon(net);
  return (
    <Pickable net={net} picked={picked} className={cx("net", isPowerNet(net) && "power", view === "detailed" && "is-detailed")} tag="div"
      title={net === picked ? "Click to stop showing it on the board" : "Click to show it on the board"}>
      <div className="net-head">
        {icon ? <Icon name={icon} className="icon net-icon"/> : <span className="net-icon net-icon-signal" aria-hidden="true"/>}
        {net.name
          ? <span className="net-name">{net.name}</span>
          : <span className="net-name unnamed">Net ({pinId(net.pins[0])})</span>}
        <span className="net-size">{net.pins.length} pins</span>
      </div>
      <PinList items={net.pins.map(pin => ({key: pinId(pin), pin, name: pinId(pin)}))} project={project} view={view}/>
    </Pickable>
  );
}

// A net's row, line or chip: picks the net with a click, or Enter or Space when focused.
function Pickable({net, picked, className, tag: Tag, title, children}: {
  net: Net; picked?: Net; className: string; tag: "div" | "span"; title: string; children: ReactNode;
}) {
  const isPicked = net === picked;
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggleNetHighlight(net);
  };
  return (
    <Tag className={cx(className, isPicked && "selected")} title={title} tabIndex={0} role="button" aria-pressed={isPicked}
      onClick={() => toggleNetHighlight(net)} onKeyDown={onKeyDown}>
      {children}
    </Tag>
  );
}
