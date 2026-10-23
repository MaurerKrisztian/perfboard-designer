import {useState} from "react";
import {ToolState} from "../../../state/ToolState";
import {setWireWidth} from "../../../features/wire";
import {useEditor} from "../../hooks/use-editor";
import {cx} from "../../lib/class-names";
import {SidebarSection} from "../SidebarSection";
import {ColorPalette} from "./ColorPalette";
import {SpectrumPicker} from "./SpectrumPicker";

// The Wire section: the thickness and colour new wires get, and the selected wire's. The wire and
// solder path tools themselves are on the tool rail (on a phone, the bottom toolbar).

const GAUGES = [
  {width: 2, label: "Thin", line: "gauge-thin"},
  {width: 4, label: "Normal", line: "gauge-normal"},
  {width: 7, label: "Thick", line: "gauge-thick"},
];

export function WireSection() {
  const color = useEditor(() => ToolState.activeWireColor);
  const width = useEditor(() => ToolState.selectedWireWidth);
  const [customColorOpen, setCustomColorOpen] = useState(false);

  const badge = <span id="activeColorBadge" className="active-color-dot" title="The colour new wires get" style={{background: color}}/>;

  return (
    <SidebarSection id="wire" bodyId="wireSection" icon="wire" title="Wire" extra={badge}>
      <div className="gauge-selector" id="wireGaugeSelector" role="group" aria-label="Thickness">
        {GAUGES.map(gauge => (
          <button key={gauge.width} className={cx("gauge-btn", width === gauge.width && "active-mode")} aria-pressed={width === gauge.width}
            onClick={() => setWireWidth(gauge.width)}>
            <span className={`gauge-line ${gauge.line}`}/>
            <span>{gauge.label}</span>
          </button>
        ))}
      </div>
      <ColorPalette active={color} onToggleCustomColor={() => setCustomColorOpen(open => !open)}/>
      {customColorOpen && <SpectrumPicker/>}
    </SidebarSection>
  );
}
