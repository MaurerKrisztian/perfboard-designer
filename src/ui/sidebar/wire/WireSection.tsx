import {useState} from "react";
import {ToolState} from "../../../state/ToolState";
import {setWireWidth, toggleRouteTool} from "../../../features/wire";
import {Icon} from "../../components/Icon";
import {useEditor} from "../../hooks/use-editor";
import {cx} from "../../lib/class-names";
import {SidebarSection} from "../SidebarSection";
import {ColorPalette} from "./ColorPalette";
import {SpectrumPicker} from "./SpectrumPicker";

// The Wire section: the wire and solder path tools, and the thickness and colour new wires get
// (the selected wire's too).

const GAUGES = [
  {width: 2, label: "Thin", line: "gauge-thin"},
  {width: 4, label: "Normal", line: "gauge-normal"},
  {width: 7, label: "Thick", line: "gauge-thick"},
];

export function WireSection() {
  const tool = useEditor(() => ToolState.active.kind);
  const color = useEditor(() => ToolState.activeWireColor);
  const width = useEditor(() => ToolState.selectedWireWidth);
  const [customColorOpen, setCustomColorOpen] = useState(false);

  const badge = (
    <span style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: 4}}>
      <span id="activeColorBadge" className="active-color-dot" title="Active Wire Color" style={{background: color, boxShadow: `0 0 6px ${color}`}}/>
    </span>
  );

  return (
    <SidebarSection id="wire" bodyId="wireSection" icon="wire" title="Wire" extra={badge}>
      <div className="wire-arm-row">
        <button className={cx("btn wire-arm-btn", tool === "wire" && "active-mode")} id="wireArmBtn"
          title="Wire tool (W): insulated jumper wires, joined only at their ends" onClick={() => toggleRouteTool("wire")}>
          <Icon name="wire"/> Wire Tool
        </button>
        <button className={cx("btn wire-arm-btn", tool === "solder" && "active-mode")} id="solderArmBtn"
          title="Solder path tool (S): a trail of solder on the copper side, joining every hole it runs over" onClick={() => toggleRouteTool("solder")}>
          <Icon name="solder-path"/> Solder Path
        </button>
      </div>

      <div className="gauge-selector" id="wireGaugeSelector">
        {GAUGES.map(gauge => (
          <button key={gauge.width} className={cx("gauge-btn", width === gauge.width && "active-mode")} onClick={() => setWireWidth(gauge.width)}>
            <span className={`gauge-line ${gauge.line}`}/>
            <span>{gauge.label}</span>
          </button>
        ))}
      </div>

      {customColorOpen && <SpectrumPicker/>}
      <ColorPalette onToggleCustomColor={() => setCustomColorOpen(open => !open)}/>
    </SidebarSection>
  );
}
