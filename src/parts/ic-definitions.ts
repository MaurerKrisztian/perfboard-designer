import {CategoryId} from "./catalog-categories";

// Built-in dual-row parts placed through the IC system (ic.ts): DIP chips and dev boards/modules
// whose pins sit in two parallel rows. Pins are numbered DIP-style: 1..N down the left row,
// then N+1..2N back up the right row.
export interface IcDefinition {
  id: string;
  // Where the part is listed in the Components panel tree (see catalog-categories.ts).
  category: CategoryId;
  name: string;
  // Extra search terms (abbreviations, part families) that don't appear in `name`.
  keywords?: string[];
  // Holes spanned across the part, rows included: row spacing in 0.1" steps + 1
  // (a 0.3" DIP is 4, a 0.6" Arduino Nano is 7).
  widthPin: number;
  // Pins per row.
  heightPin: number;
  pinDescription: Record<number, string>;
}

// Builds DIP-numbered pin labels from both rows as a pinout diagram lists them: each row read
// top to bottom. Saves hand-reversing the right row, which is where transcription errors creep in.
function dualRowPins(leftTopToBottom: string[], rightTopToBottom: string[]): Record<number, string> {
  const pins: Record<number, string> = {};
  const perSide = leftTopToBottom.length;
  leftTopToBottom.forEach((label, i) => { pins[i + 1] = label; });
  rightTopToBottom.forEach((label, i) => { pins[perSide * 2 - i] = label; });
  return pins;
}

// The pinout four-gate 14-pin logic chips share (7400, 7408, 7432, 7486).
const QUAD_GATE_PINS = dualRowPins(
  ["1A", "1B", "1Y", "2A", "2B", "2Y", "GND"],
  ["VCC", "4B", "4A", "4Y", "3B", "3A", "3Y"]
);

export const IC_DEFINITIONS: IcDefinition[] = [
  {
    id: "ne555", category: "ics.timers", name: "NE555 Timer", keywords: ["555", "timer", "oscillator"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "GND", 2: "TRIG", 3: "OUT", 4: "RESET", 5: "CTRL", 6: "THRESH", 7: "DISCH", 8: "VCC"}
  },
  {
    id: "lm358", category: "ics.analog", name: "LM358 Dual Op Amp", keywords: ["opamp", "operational amplifier", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "OUT1", 2: "IN1-", 3: "IN1+", 4: "V-", 5: "IN2+", 6: "IN2-", 7: "OUT2", 8: "V+"}
  },
  {
    id: "lm386", category: "ics.analog", name: "LM386 Audio Amplifier", keywords: ["audio", "speaker", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "GAIN", 2: "IN-", 3: "IN+", 4: "GND", 5: "OUT", 6: "VS", 7: "BYPASS", 8: "GAIN"}
  },
  {
    id: "pc817", category: "ics.opto", name: "PC817 Optocoupler", keywords: ["photocoupler", "isolator", "dip-4"],
    widthPin: 4, heightPin: 2,
    pinDescription: {1: "A", 2: "K", 3: "E", 4: "C"}
  },
  {
    id: "uln2803a", category: "ics.drivers", name: "ULN2803A Darlington Driver", keywords: ["transistor array", "relay", "motor", "dip-18"],
    widthPin: 4, heightPin: 9,
    pinDescription: dualRowPins(
      ["1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "GND"],
      ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "COM"]
    )
  },
  {
    id: "74hc595", category: "ics.logic", name: "74HC595 Shift Register", keywords: ["sn74hc595", "595", "serial", "parallel", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: {
      1: "QB", 2: "QC", 3: "QD", 4: "QE", 5: "QF", 6: "QG", 7: "QH", 8: "GND",
      9: "QH'", 10: "/SRCLR", 11: "SRCLK", 12: "RCLK", 13: "/OE", 14: "SER", 15: "QA", 16: "VCC"
    }
  },
  {
    id: "ne556", category: "ics.timers", name: "NE556 Dual Timer", keywords: ["556", "dual 555", "timer", "oscillator", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["DIS1", "THR1", "CTL1", "RST1", "OUT1", "TRG1", "GND"],
      ["VCC", "DIS2", "THR2", "CTL2", "RST2", "OUT2", "TRG2"]
    )
  },
  {
    id: "lm393", category: "ics.analog", name: "LM393 Dual Comparator", keywords: ["comparator", "open collector", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "OUT1", 2: "IN1-", 3: "IN1+", 4: "GND", 5: "IN2+", 6: "IN2-", 7: "OUT2", 8: "VCC"}
  },
  {
    id: "tl072", category: "ics.analog", name: "TL072 Dual JFET Op Amp", keywords: ["opamp", "operational amplifier", "audio", "low noise", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "OUT1", 2: "IN1-", 3: "IN1+", 4: "VCC-", 5: "IN2+", 6: "IN2-", 7: "OUT2", 8: "VCC+"}
  },
  {
    id: "4n35", category: "ics.opto", name: "4N35 Optocoupler", keywords: ["phototransistor", "photocoupler", "isolator", "dip-6"],
    widthPin: 4, heightPin: 3,
    pinDescription: {1: "A", 2: "K", 3: "NC", 4: "E", 5: "C", 6: "B"}
  },
  {
    id: "6n137", category: "ics.opto", name: "6N137 High-Speed Optocoupler", keywords: ["logic output", "photocoupler", "isolator", "midi", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "NC", 2: "A", 3: "K", 4: "NC", 5: "GND", 6: "VO", 7: "VE", 8: "VCC"}
  },
  {
    id: "l293d", category: "ics.drivers", name: "L293D Motor Driver", keywords: ["h-bridge", "motor", "stepper", "dc motor", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["1,2EN", "1A", "1Y", "GND", "GND", "2Y", "2A", "VCC2"],
      ["VCC1", "4A", "4Y", "GND", "GND", "3Y", "3A", "3,4EN"]
    )
  },
  {
    id: "cd4017", category: "ics.logic", name: "CD4017 Decade Counter", keywords: ["4017", "johnson counter", "led chaser", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["Q5", "Q1", "Q0", "Q2", "Q6", "Q7", "Q3", "VSS"],
      ["VDD", "RST", "CLK", "/EN", "CO", "Q9", "Q4", "Q8"]
    )
  },
  {
    id: "74hc14", category: "ics.logic", name: "74HC14 Schmitt Inverter", keywords: ["sn74hc14", "hex inverter", "schmitt trigger", "debounce", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["1A", "1Y", "2A", "2Y", "3A", "3Y", "GND"],
      ["VCC", "6A", "6Y", "5A", "5Y", "4A", "4Y"]
    )
  },
  {
    id: "dip-14-logic", category: "ics.logic", name: "DIP-14 Logic", keywords: ["74hc", "7400", "gate"],
    widthPin: 4, heightPin: 7,
    pinDescription: {1: "1A", 2: "1B", 3: "1Y", 4: "2A", 5: "2B", 6: "2Y", 7: "GND", 14: "VCC"}
  },
  {
    id: "dip-16-logic", category: "ics.logic", name: "DIP-16 Logic", keywords: ["74hc", "shift register", "595"],
    widthPin: 4, heightPin: 8,
    pinDescription: {1: "EN", 2: "1D", 3: "1Q", 4: "2D", 5: "2Q", 8: "GND", 16: "VCC"}
  },
  {
    id: "74hc00", category: "ics.logic", name: "74HC00 Quad NAND Gate", keywords: ["sn74hc00", "7400", "nand", "gate", "dip-14"],
    widthPin: 4, heightPin: 7, pinDescription: QUAD_GATE_PINS
  },
  {
    id: "74hc02", category: "ics.logic", name: "74HC02 Quad NOR Gate", keywords: ["sn74hc02", "7402", "nor", "gate", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["1Y", "1A", "1B", "2Y", "2A", "2B", "GND"],
      ["VCC", "4Y", "4B", "4A", "3Y", "3B", "3A"]
    )
  },
  {
    id: "74hc04", category: "ics.logic", name: "74HC04 Hex Inverter", keywords: ["sn74hc04", "7404", "not", "inverter", "gate", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["1A", "1Y", "2A", "2Y", "3A", "3Y", "GND"],
      ["VCC", "6A", "6Y", "5A", "5Y", "4A", "4Y"]
    )
  },
  {
    id: "74hc08", category: "ics.logic", name: "74HC08 Quad AND Gate", keywords: ["sn74hc08", "7408", "and", "gate", "dip-14"],
    widthPin: 4, heightPin: 7, pinDescription: QUAD_GATE_PINS
  },
  {
    id: "74hc32", category: "ics.logic", name: "74HC32 Quad OR Gate", keywords: ["sn74hc32", "7432", "or", "gate", "dip-14"],
    widthPin: 4, heightPin: 7, pinDescription: QUAD_GATE_PINS
  },
  {
    id: "74hc86", category: "ics.logic", name: "74HC86 Quad XOR Gate", keywords: ["sn74hc86", "7486", "xor", "exclusive or", "gate", "dip-14"],
    widthPin: 4, heightPin: 7, pinDescription: QUAD_GATE_PINS
  },
  {
    id: "74hc74", category: "ics.logic", name: "74HC74 Dual D Flip-Flop", keywords: ["sn74hc74", "7474", "flip flop", "latch", "divider", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["/1CLR", "1D", "1CLK", "/1PRE", "1Q", "/1Q", "GND"],
      ["VCC", "/2CLR", "2D", "2CLK", "/2PRE", "2Q", "/2Q"]
    )
  },
  {
    id: "74hc138", category: "ics.logic", name: "74HC138 3-to-8 Decoder", keywords: ["sn74hc138", "74138", "demultiplexer", "address decoder", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["A0", "A1", "A2", "/E1", "/E2", "E3", "/Y7", "GND"],
      ["VCC", "/Y0", "/Y1", "/Y2", "/Y3", "/Y4", "/Y5", "/Y6"]
    )
  },
  {
    id: "74hc165", category: "ics.logic", name: "74HC165 Input Shift Register", keywords: ["sn74hc165", "74165", "parallel in serial out", "piso", "buttons", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["/PL", "CP", "D4", "D5", "D6", "D7", "/Q7", "GND"],
      ["VCC", "/CE", "D3", "D2", "D1", "D0", "DS", "Q7"]
    )
  },
  {
    id: "cd4013", category: "ics.logic", name: "CD4013 Dual D Flip-Flop", keywords: ["4013", "flip flop", "latch", "toggle", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["Q1", "/Q1", "CLK1", "R1", "D1", "S1", "VSS"],
      ["VDD", "Q2", "/Q2", "CLK2", "R2", "D2", "S2"]
    )
  },
  {
    id: "cd4051", category: "ics.logic", name: "CD4051 8-Channel Analog Mux", keywords: ["4051", "multiplexer", "demultiplexer", "analog switch", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["X4", "X6", "COM", "X7", "X5", "INH", "VEE", "VSS"],
      ["VDD", "X2", "X1", "X0", "X3", "A", "B", "C"]
    )
  },
  {
    id: "cd4060", category: "ics.logic", name: "CD4060 Counter & Oscillator", keywords: ["4060", "ripple counter", "binary counter", "timer", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["Q12", "Q13", "Q14", "Q6", "Q5", "Q7", "Q4", "VSS"],
      ["VDD", "Q10", "Q8", "Q9", "RST", "RS", "RTC", "CTC"]
    )
  },
  {
    id: "cd4093", category: "ics.logic", name: "CD4093 Schmitt NAND Gate", keywords: ["4093", "quad nand", "schmitt trigger", "oscillator", "debounce", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["1A", "1B", "1Y", "2Y", "2A", "2B", "VSS"],
      ["VDD", "4B", "4A", "4Y", "3Y", "3B", "3A"]
    )
  },
  {
    id: "cd4511", category: "ics.logic", name: "CD4511 7-Segment Driver", keywords: ["4511", "bcd", "decoder", "seven segment", "display driver", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["B", "C", "/LT", "/BL", "LE", "D", "A", "VSS"],
      ["VDD", "f", "g", "a", "b", "c", "d", "e"]
    )
  },
  {
    id: "lm324", category: "ics.analog", name: "LM324 Quad Op Amp", keywords: ["opamp", "operational amplifier", "single supply", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["OUT1", "IN1-", "IN1+", "VCC", "IN2+", "IN2-", "OUT2"],
      ["OUT4", "IN4-", "IN4+", "GND", "IN3+", "IN3-", "OUT3"]
    )
  },
  {
    id: "tl074", category: "ics.analog", name: "TL074 Quad JFET Op Amp", keywords: ["opamp", "operational amplifier", "audio", "low noise", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["OUT1", "IN1-", "IN1+", "VCC+", "IN2+", "IN2-", "OUT2"],
      ["OUT4", "IN4-", "IN4+", "VCC-", "IN3+", "IN3-", "OUT3"]
    )
  },
  {
    id: "ne5532", category: "ics.analog", name: "NE5532 Dual Audio Op Amp", keywords: ["opamp", "operational amplifier", "audio", "low noise", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "OUT1", 2: "IN1-", 3: "IN1+", 4: "VCC-", 5: "IN2+", 6: "IN2-", 7: "OUT2", 8: "VCC+"}
  },
  {
    id: "mcp6002", category: "ics.analog", name: "MCP6002 Rail-to-Rail Op Amp", keywords: ["opamp", "operational amplifier", "3.3v", "low voltage", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "OUT1", 2: "IN1-", 3: "IN1+", 4: "VSS", 5: "IN2+", 6: "IN2-", 7: "OUT2", 8: "VDD"}
  },
  {
    id: "lm741", category: "ics.analog", name: "LM741 Op Amp", keywords: ["ua741", "741", "opamp", "operational amplifier", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "NULL", 2: "IN-", 3: "IN+", 4: "V-", 5: "NULL", 6: "OUT", 7: "V+", 8: "NC"}
  },
  {
    id: "lm339", category: "ics.analog", name: "LM339 Quad Comparator", keywords: ["comparator", "open collector", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["OUT2", "OUT1", "VCC", "IN1-", "IN1+", "IN2-", "IN2+"],
      ["OUT3", "OUT4", "GND", "IN4+", "IN4-", "IN3+", "IN3-"]
    )
  },
  {
    id: "uln2003a", category: "ics.drivers", name: "ULN2003A Darlington Driver", keywords: ["transistor array", "relay", "stepper", "28byj-48", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["1B", "2B", "3B", "4B", "5B", "6B", "7B", "GND"],
      ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "COM"]
    )
  },
  {
    id: "max7219", category: "ics.drivers", name: "MAX7219 LED Display Driver", keywords: ["led matrix", "seven segment", "display driver", "spi", "dip-24"],
    widthPin: 4, heightPin: 12,
    pinDescription: dualRowPins(
      ["DIN", "DIG0", "DIG4", "GND", "DIG6", "DIG2", "DIG3", "DIG7", "GND", "DIG5", "DIG1", "LOAD"],
      ["DOUT", "SEGD", "SEGDP", "SEGE", "SEGC", "V+", "ISET", "SEGG", "SEGB", "SEGF", "SEGA", "CLK"]
    )
  },
  {
    id: "mcp23017", category: "ics.interface", name: "MCP23017 I/O Expander", keywords: ["i2c", "gpio", "16 bit", "port expander", "dip-28"],
    widthPin: 4, heightPin: 14,
    pinDescription: dualRowPins(
      ["GPB0", "GPB1", "GPB2", "GPB3", "GPB4", "GPB5", "GPB6", "GPB7", "VDD", "VSS", "NC", "SCL", "SDA", "NC"],
      ["GPA7", "GPA6", "GPA5", "GPA4", "GPA3", "GPA2", "GPA1", "GPA0", "INTA", "INTB", "/RST", "A2", "A1", "A0"]
    )
  },
  {
    id: "pcf8574", category: "ics.interface", name: "PCF8574 I/O Expander", keywords: ["i2c", "gpio", "8 bit", "port expander", "lcd backpack", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["A0", "A1", "A2", "P0", "P1", "P2", "P3", "VSS"],
      ["VDD", "SDA", "SCL", "/INT", "P7", "P6", "P5", "P4"]
    )
  },
  {
    id: "mcp3008", category: "ics.interface", name: "MCP3008 8-Channel ADC", keywords: ["adc", "analog to digital", "10 bit", "spi", "raspberry pi", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["CH0", "CH1", "CH2", "CH3", "CH4", "CH5", "CH6", "CH7"],
      ["VDD", "VREF", "AGND", "CLK", "DOUT", "DIN", "/CS", "DGND"]
    )
  },
  {
    id: "24lc256", category: "ics.interface", name: "24LC256 I2C EEPROM", keywords: ["eeprom", "memory", "storage", "at24c256", "32kb", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "A0", 2: "A1", 3: "A2", 4: "GND", 5: "SDA", 6: "SCL", 7: "WP", 8: "VCC"}
  },
  {
    id: "ds1307", category: "ics.interface", name: "DS1307 Real-Time Clock", keywords: ["rtc", "clock", "i2c", "timekeeping", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "X1", 2: "X2", 3: "VBAT", 4: "GND", 5: "SDA", 6: "SCL", 7: "SQW", 8: "VCC"}
  },
  {
    id: "max232", category: "ics.interface", name: "MAX232 RS-232 Driver", keywords: ["rs232", "uart", "serial", "level shifter", "dip-16"],
    widthPin: 4, heightPin: 8,
    pinDescription: dualRowPins(
      ["C1+", "VS+", "C1-", "C2+", "C2-", "VS-", "T2OUT", "R2IN"],
      ["VCC", "GND", "T1OUT", "R1IN", "R1OUT", "T1IN", "T2IN", "R2OUT"]
    )
  },
  // Pins named after their ports, with the Arduino name where it says more (A0-A3, the serial and
  // SPI pins). Port D's PD0-PD7 are Arduino D0-D7, port B's PB0-PB5 are D8-D13.
  {
    id: "atmega328p", category: "ics.microcontrollers", name: "ATmega328P", keywords: ["avr", "arduino", "328", "atmega8", "atmega168", "uno", "dip-28"],
    widthPin: 4, heightPin: 14,
    pinDescription: dualRowPins(
      ["PC6/RST", "PD0/RX", "PD1/TX", "PD2", "PD3", "PD4", "VCC", "GND", "PB6/XT1", "PB7/XT2", "PD5", "PD6", "PD7", "PB0"],
      ["PC5/SCL", "PC4/SDA", "PC3/A3", "PC2/A2", "PC1/A1", "PC0/A0", "GND", "AREF", "AVCC", "PB5/SCK", "PB4/MISO", "PB3/MOSI", "PB2", "PB1"]
    )
  },
  {
    id: "attiny85", category: "ics.microcontrollers", name: "ATtiny85", keywords: ["avr", "attiny", "tiny85", "digispark", "dip-8"],
    widthPin: 4, heightPin: 4,
    pinDescription: {1: "PB5/RST", 2: "PB3", 3: "PB4", 4: "GND", 5: "PB0", 6: "PB1", 7: "PB2", 8: "VCC"}
  },
  {
    id: "attiny84", category: "ics.microcontrollers", name: "ATtiny84", keywords: ["avr", "attiny", "tiny84", "attiny44", "attiny24", "dip-14"],
    widthPin: 4, heightPin: 7,
    pinDescription: dualRowPins(
      ["VCC", "PB0", "PB1", "PB3/RST", "PB2", "PA7", "PA6"],
      ["GND", "PA0", "PA1", "PA2", "PA3", "PA4", "PA5"]
    )
  },
  {
    id: "attiny2313", category: "ics.microcontrollers", name: "ATtiny2313", keywords: ["avr", "attiny", "tiny2313", "attiny4313", "uart", "dip-20"],
    widthPin: 4, heightPin: 10,
    pinDescription: dualRowPins(
      ["PA2/RST", "PD0/RX", "PD1/TX", "PA1", "PA0", "PD2", "PD3", "PD4", "PD5", "GND"],
      ["VCC", "PB7", "PB6", "PB5", "PB4", "PB3", "PB2", "PB1", "PB0", "PD6"]
    )
  },
  // Arduino Nano: 0.6" between header rows, 15 pins per side. Labels as silkscreened on the board.
  {
    id: "arduino-nano", category: "modules.dev-boards", name: "Arduino Nano", keywords: ["nano", "atmega328p", "avr", "nano every"],
    widthPin: 7, heightPin: 15,
    pinDescription: {
      1: "D13", 2: "3V3", 3: "REF", 4: "A0", 5: "A1", 6: "A2", 7: "A3", 8: "A4",
      9: "A5", 10: "A6", 11: "A7", 12: "5V", 13: "RST", 14: "GND", 15: "VIN",
      16: "TX1", 17: "RX0", 18: "RST", 19: "GND", 20: "D2", 21: "D3", 22: "D4",
      23: "D5", 24: "D6", 25: "D7", 26: "D8", 27: "D9", 28: "D10", 29: "D11", 30: "D12"
    }
  },
  // Arduino Nano 33 IoT, BLE and RP2040 Connect: the Nano's footprint at 3.3 V logic. VUSB is where
  // a Nano has 5V, and only carries USB power once its solder jumper is closed.
  {
    id: "arduino-nano-33", category: "modules.dev-boards", name: "Arduino Nano 33 IoT", keywords: ["nano 33", "nano 33 ble", "samd21", "nano rp2040", "3.3v", "wifi"],
    widthPin: 7, heightPin: 15,
    pinDescription: dualRowPins(
      ["D13", "3V3", "AREF", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "VUSB", "RST", "GND", "VIN"],
      ["D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "GND", "RST", "RX0", "TX1"]
    )
  },
  // Arduino Micro: 0.6" between rows, 17 pins per side, USB at the top.
  {
    id: "arduino-micro", category: "modules.dev-boards", name: "Arduino Micro", keywords: ["micro", "atmega32u4", "32u4", "avr", "usb hid"],
    widthPin: 7, heightPin: 17,
    pinDescription: dualRowPins(
      ["D13", "3V3", "AREF", "A0", "A1", "A2", "A3", "A4", "A5", "NC", "NC", "5V", "RST", "GND", "VIN", "MISO", "SCK"],
      ["D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3/SCL", "D2/SDA", "GND", "RST", "D0/RX", "D1/TX", "SS", "MOSI"]
    )
  },
  // SparkFun Pro Micro and its clones: 0.6" between rows, 12 pins per side, USB at the top.
  {
    id: "arduino-pro-micro", category: "modules.dev-boards", name: "Arduino Pro Micro", keywords: ["pro micro", "sparkfun", "atmega32u4", "32u4", "avr", "keyboard", "usb hid"],
    widthPin: 7, heightPin: 12,
    pinDescription: dualRowPins(
      ["TX", "RX", "GND", "GND", "D2/SDA", "D3/SCL", "D4", "D5", "D6", "D7", "D8", "D9"],
      ["RAW", "GND", "RST", "VCC", "A3", "A2", "A1", "A0", "D15", "D14", "D16", "D10"]
    )
  },
  // STM32F103 Blue Pill: 0.6" between rows, 20 pins per side, USB at the top. The silkscreen's G and
  // 3.3 are written GND and 3V3 here, so the nets know them for rails.
  {
    id: "stm32-blue-pill", category: "modules.dev-boards", name: "STM32 Blue Pill", keywords: ["stm32", "stm32f103", "f103c8t6", "arm", "cortex-m3", "bluepill"],
    widthPin: 7, heightPin: 20,
    pinDescription: dualRowPins(
      ["B12", "B13", "B14", "B15", "A8", "A9", "A10", "A11", "A12", "A15", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "5V", "GND", "3V3"],
      ["GND", "GND", "3V3", "RST", "B11", "B10", "B1", "B0", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0", "C15", "C14", "C13", "VBAT"]
    )
  },
  // WeAct Black Pill V2 (STM32F401/F411): 0.6" between rows, 20 pins per side, USB at the top.
  // Not the Blue Pill's pinout: its power pins sit at both ends.
  {
    id: "stm32-black-pill", category: "modules.dev-boards", name: "STM32 Black Pill", keywords: ["stm32", "stm32f411", "stm32f401", "weact", "arm", "cortex-m4", "blackpill"],
    widthPin: 7, heightPin: 20,
    pinDescription: dualRowPins(
      ["B12", "B13", "B14", "B15", "A8", "A9", "A10", "A11", "A12", "A15", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "5V", "GND", "3V3"],
      ["5V", "GND", "3V3", "B10", "B2", "B1", "B0", "A7", "A6", "A5", "A4", "A3", "A2", "A1", "A0", "RST", "C15", "C14", "C13", "VBAT"]
    )
  },
  // PJRC Teensy 4.0, outer pins: 0.6" between rows, 14 pins per side, USB at the top.
  {
    id: "teensy-40", category: "modules.dev-boards", name: "Teensy 4.0", keywords: ["teensy", "pjrc", "imxrt1062", "arm", "cortex-m7"],
    widthPin: 7, heightPin: 14,
    pinDescription: dualRowPins(
      ["GND", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12"],
      ["VIN", "GND", "3V3", "D23", "D22", "D21", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13"]
    )
  },
  // Seeed Studio XIAO, all versions (SAMD21, RP2040, ESP32-C3, ESP32-S3, nRF52840): 0.6" between
  // rows, 7 pins per side, USB at the top.
  {
    id: "seeed-xiao", category: "modules.dev-boards", name: "Seeed XIAO", keywords: ["xiao", "seeeduino", "samd21", "rp2040", "esp32-c3", "esp32-s3", "nrf52840"],
    widthPin: 7, heightPin: 7,
    pinDescription: dualRowPins(
      ["D0/A0", "D1", "D2", "D3", "D4/SDA", "D5/SCL", "D6/TX"],
      ["5V", "GND", "3V3", "D10", "D9", "D8/SCK", "D7/RX"]
    )
  },
  // NodeMCU ESP8266 DevKit v1.0 (Amica): 0.9" between rows, 15 pins per side. Antenna at the top.
  {
    id: "nodemcu-amica", category: "modules.dev-boards", name: "NodeMCU ESP8266 (Amica, 0.9\")", keywords: ["nodemcu", "esp8266", "esp-12", "amica", "v2", "wifi"],
    widthPin: 10, heightPin: 15,
    pinDescription: dualRowPins(
      ["A0", "RSV", "RSV", "SD3", "SD2", "SD1", "CMD", "SD0", "CLK", "GND", "3V3", "EN", "RST", "GND", "VIN"],
      ["D0", "D1", "D2", "D3", "D4", "3V3", "GND", "D5", "D6", "D7", "D8", "RX", "TX", "GND", "3V3"]
    )
  },
  // LoLin NodeMCU V3: the Amica's pinout on a wider board, 1.1" between rows, with VU (USB power)
  // where the Amica has a reserved pin.
  {
    id: "nodemcu-lolin-v3", category: "modules.dev-boards", name: "NodeMCU ESP8266 (LoLin V3, 1.1\")", keywords: ["nodemcu", "esp8266", "esp-12", "lolin", "v3", "wifi"],
    widthPin: 12, heightPin: 15,
    pinDescription: dualRowPins(
      ["A0", "GND", "VU", "SD3", "SD2", "SD1", "CMD", "SD0", "CLK", "GND", "3V3", "EN", "RST", "GND", "VIN"],
      ["D0", "D1", "D2", "D3", "D4", "3V3", "GND", "D5", "D6", "D7", "D8", "RX", "TX", "GND", "3V3"]
    )
  },
  // Espressif ESP32-S3-DevKitC-1: 0.9" between rows, 22 pins per side. Antenna at the top.
  {
    id: "esp32-s3-devkitc", category: "modules.dev-boards", name: "ESP32-S3 DevKitC-1", keywords: ["esp32-s3", "esp32", "esp", "espressif", "wifi", "bluetooth"],
    widthPin: 10, heightPin: 22,
    pinDescription: dualRowPins(
      ["3V3", "3V3", "RST", "IO4", "IO5", "IO6", "IO7", "IO15", "IO16", "IO17", "IO18", "IO8", "IO3", "IO46", "IO9", "IO10", "IO11", "IO12", "IO13", "IO14", "5V", "GND"],
      ["GND", "TX", "RX", "IO1", "IO2", "IO42", "IO41", "IO40", "IO39", "IO38", "IO37", "IO36", "IO35", "IO0", "IO45", "IO48", "IO47", "IO21", "IO20", "IO19", "GND", "GND"]
    )
  },
  // Espressif ESP32-C3-DevKitM-1: 0.9" between rows, 15 pins per side. Antenna at the top.
  {
    id: "esp32-c3-devkitm", category: "modules.dev-boards", name: "ESP32-C3 DevKitM-1", keywords: ["esp32-c3", "esp32", "esp", "espressif", "risc-v", "wifi", "bluetooth"],
    widthPin: 10, heightPin: 15,
    pinDescription: dualRowPins(
      ["GND", "3V3", "3V3", "IO2", "IO3", "GND", "RST", "GND", "IO0", "IO1", "IO10", "GND", "5V", "5V", "GND"],
      ["GND", "TX", "RX", "GND", "IO9", "IO8", "GND", "IO7", "IO6", "IO5", "IO4", "GND", "IO18", "IO19", "GND"]
    )
  },
  // DOIT ESP32 DevKit V1, 30-pin: 0.9" between rows (some clones are 1.0" - check yours).
  // Antenna at the top, USB at the bottom.
  {
    id: "esp32-devkit-v1-30", category: "modules.dev-boards", name: "ESP32 DevKit V1 (30-pin)",
    keywords: ["esp32", "esp", "doit", "wifi", "bluetooth"],
    widthPin: 10, heightPin: 15,
    pinDescription: dualRowPins(
      ["EN", "VP", "VN", "D34", "D35", "D32", "D33", "D25", "D26", "D27", "D14", "D12", "D13", "GND", "VIN"],
      ["D23", "D22", "TX0", "RX0", "D21", "D19", "D18", "D5", "TX2", "RX2", "D4", "D2", "D15", "GND", "3V3"]
    )
  },
  // Espressif ESP32-DevKitC V4, 38-pin: 1.0" between rows. Antenna at the top, USB at the bottom.
  {
    id: "esp32-devkitc-38", category: "modules.dev-boards", name: "ESP32 DevKitC (38-pin)",
    keywords: ["esp32", "esp", "espressif", "wroom", "wifi", "bluetooth"],
    widthPin: 11, heightPin: 19,
    pinDescription: dualRowPins(
      ["3V3", "EN", "VP", "VN", "IO34", "IO35", "IO32", "IO33", "IO25", "IO26", "IO27", "IO14", "IO12", "GND", "IO13", "SD2", "SD3", "CMD", "5V"],
      ["GND", "IO23", "IO22", "TX", "RX", "IO21", "GND", "IO19", "IO18", "IO5", "IO17", "IO16", "IO4", "IO0", "IO2", "IO15", "SD1", "SD0", "CLK"]
    )
  },
  // Raspberry Pi Pico: 0.7" between rows, 20 pins per side. USB at the top (pin 1 = GP0).
  {
    id: "raspberry-pi-pico", category: "modules.dev-boards", name: "Raspberry Pi Pico",
    keywords: ["pico", "rp2040", "raspberry", "rpi", "pico w", "pico 2", "rp2350"],
    widthPin: 8, heightPin: 20,
    pinDescription: dualRowPins(
      ["GP0", "GP1", "GND", "GP2", "GP3", "GP4", "GP5", "GND", "GP6", "GP7", "GP8", "GP9", "GND", "GP10", "GP11", "GP12", "GP13", "GND", "GP14", "GP15"],
      ["VBUS", "VSYS", "GND", "3V3_EN", "3V3", "ADC_VREF", "GP28", "AGND", "GP27", "GP26", "RUN", "GP22", "GND", "GP21", "GP20", "GP19", "GP18", "GND", "GP17", "GP16"]
    )
  },
  // Wemos / LOLIN D1 Mini: 0.9" between rows, 8 pins per side. Antenna at the top, USB at the bottom.
  {
    id: "wemos-d1-mini", category: "modules.dev-boards", name: "Wemos D1 Mini",
    keywords: ["d1 mini", "lolin", "esp8266", "wifi"],
    widthPin: 10, heightPin: 8,
    pinDescription: dualRowPins(
      ["RST", "A0", "D0", "D5", "D6", "D7", "D8", "3V3"],
      ["TX", "RX", "D1", "D2", "D3", "D4", "GND", "5V"]
    )
  },
];

export function getIcDefinition(id: string): IcDefinition | undefined {
  return IC_DEFINITIONS.find(def => def.id === id);
}
