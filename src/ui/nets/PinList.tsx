import type {ReactNode} from "react";
import type {ProjectFile} from "../../project-file/project-file";
import {NetPin, pinId} from "../../project-file/nets";
import {cx} from "../lib/class-names";
import {describePin, NetsView, PartInfo, partInfo, pinRole} from "./part-info";

// A net's pins, short or detailed (the Nets panel's view): a chip each, "D1.K" after its part's
// icon, or a line each, "D1 LED · Red … cathode (K)". A pin of a part gone from the board (a
// required net's) has only its name, struck through.

export interface PinItem {
  key: string;
  // The pin on the board; absent when its part isn't there any more.
  pin?: NetPin;
  // Its name for when it isn't on the board.
  name: string;
}

export function PartIcon({part}: {part?: PartInfo}) {
  return part?.icon
    ? <img className="pin-icon" src={part.icon} alt="" loading="lazy"/>
    : <span className="pin-icon pin-icon-none" aria-hidden="true"/>;
}

// "U1.8" then its name, "VCC"; a two-lead part's lead is "D1.K".
function chipText(pin: NetPin): ReactNode {
  return (
    <>
      {pinId(pin)}
      {pin.label && pin.kind !== "standard-component" && <span className="net-pin-label">{pin.label}</span>}
    </>
  );
}

export function PinChipContent({pin, part}: {pin: NetPin; part?: PartInfo}) {
  return <><PartIcon part={part}/>{chipText(pin)}</>;
}

export function PinRowContent({pin, part}: {pin: NetPin; part?: PartInfo}) {
  return (
    <>
      <PartIcon part={part}/>
      <span className="pin-row-part">
        <strong>{pin.ref}</strong>
        {part && <span className="pin-row-name">{part.name}{part.value ? ` · ${part.value}` : ""}</span>}
      </span>
      <span className="pin-row-role">{pinRole(pin)}</span>
    </>
  );
}

export function PinList({items, project, view}: {items: PinItem[]; project: ProjectFile; view: NetsView}) {
  const parts = partInfo(project);
  if (view === "detailed") {
    return (
      <ul className="pin-rows">
        {items.map(({key, pin, name}) => pin
          ? <li key={key} className="pin-row" title={describePin(pin, parts.get(pin.ref))}><PinRowContent pin={pin} part={parts.get(pin.ref)}/></li>
          : <li key={key} className="pin-row is-missing" title={`${name}: its part isn't on the board`}>
            <PartIcon/><span className="pin-row-part"><strong>{name}</strong><span className="pin-row-name">not on the board</span></span>
          </li>)}
      </ul>
    );
  }
  return (
    <span className="net-pins">
      {items.map(({key, pin, name}) => (
        <span key={key} className={cx("net-pin", !pin && "is-missing")}
          title={pin ? describePin(pin, parts.get(pin.ref)) : `${name}: its part isn't on the board`}>
          {pin ? <PinChipContent pin={pin} part={parts.get(pin.ref)}/> : name}
        </span>
      ))}
    </span>
  );
}
