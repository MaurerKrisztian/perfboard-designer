// A project's description: what the board is and how it works, in its maker's words. It's saved in
// the project file (`description`) and shown by the editor, the project PDF and the shared board's
// page (view/). Pure, like the rest of this folder.
//
// It's written in a small part of Markdown, which reads fine as plain text too: # headings, - and
// 1. lists, **bold**, *italic*, `code`, [links](https://...) and bare https:// addresses. A single
// line break stays a line break, as people expect when they aren't writing Markdown on purpose.
// Whoever shows it can also have the board's part names found in it (R1, U1.8, D1.K), to find that
// part with: see FindMention.
//
// Project files come from anyone (a share link opens one), so this is untrusted text. It's turned
// into HTML in this one place: everything is escaped, nothing the text says becomes a tag of its
// own, there are no images (which would tell other sites who's reading), and a link is only ever
// http(s).

import type {GridPos} from "./grid";

// Well past any real write-up, and a share link carrying this much is too long to send anyway.
export const MAX_DESCRIPTION_LENGTH = 20_000;

// A description as it's kept: line breaks made one kind, no blank ends, at most the limit; undefined
// for anything without text.
export function readDescription(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.replace(/\r\n?/g, "\n").trim();
  return text ? text.slice(0, MAX_DESCRIPTION_LENGTH) : undefined;
}

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);

const linkHtml = (href: string, label: string) =>
  `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer nofollow ugc">${label}</a>`;

// A part the text names, as an element of class "part-ref" with its data-ref, and data-hole ("5,6")
// for one of its pins. It acts as a button but it's a <span> with that role, as a real <button> is one
// unbreakable box in a line of text, which can leave the full stop after a name alone on the next
// line. part-mentions.ts makes these from a project file.
export interface PartMention {
  ref: string;
  // The hole of the pin it names, when it names one.
  hole?: GridPos;
  // What it is, for a tooltip.
  title: string;
}

// The part called `ref`, exactly as the board writes it, or its pin called `pin`; undefined when the
// board has no such thing.
export type FindMention = (ref: string, pin?: string) => PartMention | undefined;

const mentionHtml = ({ref, hole, title}: PartMention, label: string) =>
  `<span class="part-ref" role="button" tabindex="0" data-ref="${escapeHtml(ref)}"${hole ? ` data-hole="${hole[0]},${hole[1]}"` : ""} title="${escapeHtml(title)}">${label}</span>`;

// `text` without any of `chars` at its end. A loop, as a regex for this can crawl on a long hostile
// run of them.
function trimEnd(text: string, chars: string): string {
  let end = text.length;
  while (end > 0 && chars.includes(text[end - 1])) end--;
  return text.slice(0, end);
}

// One word as HTML: a part's name, one of its pins ("U1.8", with what follows left as text), or a
// few names joined by dashes ("R1-R3"), though a ref can hold a dash too.
function wordHtml(word: string, find: FindMention): string {
  const dot = word.indexOf(".");
  const name = dot < 0 ? word : word.slice(0, dot);
  const rest = dot < 0 ? "" : word.slice(dot);
  const pin = trimEnd(rest.slice(1), ".");
  const pinMention = pin ? find(name, pin) : undefined;
  if (pinMention) return mentionHtml(pinMention, escapeHtml(`${name}.${pin}`)) + escapeHtml(rest.slice(pin.length + 1));
  const mention = find(name);
  if (mention) return mentionHtml(mention, escapeHtml(name)) + escapeHtml(rest);
  const named = name.split("-").map(part => {
    const found = find(part);
    return found ? mentionHtml(found, escapeHtml(part)) : escapeHtml(part);
  });
  return named.join("-") + escapeHtml(rest);
}

// A ref's characters, then optionally a dot and a pin's name, which may be nearly anything ("+", "D+").
const WORD = /[A-Za-z0-9_-]+(?:\.[^\s,;:!?()]+)?/g;

function plainHtml(text: string, find?: FindMention): string {
  if (!find) return escapeHtml(text);
  let html = "";
  let at = 0;
  for (const match of text.matchAll(WORD)) {
    const start = match.index ?? 0;
    html += escapeHtml(text.slice(at, start)) + wordHtml(match[0], find);
    at = start + match[0].length;
  }
  return html + escapeHtml(text.slice(at));
}

// `code` holding just a part's name is a mention too: the text may well write them that way.
function codeHtml(code: string, find?: FindMention): string {
  const html = `<code>${escapeHtml(code)}</code>`;
  if (!find) return html;
  const dot = code.indexOf(".");
  const mention = dot < 0 ? find(code) : find(code.slice(0, dot), code.slice(dot + 1));
  return mention ? mentionHtml(mention, html) : html;
}

// A web address. It may hold brackets in pairs, as Wikipedia's do (".../555_timer_IC_(chip)"), but
// not a lone ")", which closes the [link](...) or the sentence's own bracket around it. Each step
// takes one character or one whole pair, never both, so a long hostile run can't make it backtrack.
const ADDRESS = String.raw`https?:\/\/(?:[^\s()<>"]|\([^\s()<>"]*\))+`;

// Whichever comes first: `code`, [a link](https://...), **bold**, *italic*, a bare address. Each
// part stops at the next mark it can't hold, so a long hostile line can't make this crawl.
const INLINE = new RegExp(String.raw`\`([^\`\n]+)\`|\[([^[\]\n]+)\]\((${ADDRESS})\)|\*\*(.+?)\*\*|\*(?=\S)([^*]*?\S)\*|(${ADDRESS})`, "gi");

function inlineHtml(text: string, find?: FindMention): string {
  let html = "";
  let at = 0;
  for (const match of text.matchAll(INLINE)) {
    const [whole, code, label, href, bold, italic, bare] = match;
    const start = match.index ?? 0;
    html += plainHtml(text.slice(at, start), find);
    at = start + whole.length;
    if (code !== undefined) html += codeHtml(code, find);
    // A link's label stays plain: an address or a part's button in it would be one link inside another.
    else if (href !== undefined) html += linkHtml(href, escapeHtml(label));
    else if (bold !== undefined) html += `<strong>${inlineHtml(bold, find)}</strong>`;
    else if (italic !== undefined) html += `<em>${inlineHtml(italic, find)}</em>`;
    else {
      // Punctuation after an address belongs to the sentence.
      const address = trimEnd(bare, ".,;:!?");
      html += linkHtml(address, escapeHtml(address)) + escapeHtml(bare.slice(address.length));
    }
  }
  return html + plainHtml(text.slice(at), find);
}

// The description as HTML, safe to put in a page as it is. Headings start at <h2>, as the page
// around it has the project's name as its <h1>. With `find`, the board's part names in it are marked
// as buttons, for a page that does something with them.
export function descriptionHtml(description: string, find?: FindMention): string {
  const html: string[] = [];
  let paragraph: string[] = [];
  // A numbered list starts at its first item's number ("3." starts at 3), as people number them.
  let list: {tag: "ul" | "ol"; start?: number; items: string[]} | undefined;

  const endParagraph = () => {
    if (paragraph.length) html.push(`<p>${paragraph.map(line => inlineHtml(line, find)).join("<br>")}</p>`);
    paragraph = [];
  };
  const endList = () => {
    if (list) {
      const start = list.start !== undefined && list.start !== 1 ? ` start="${list.start}"` : "";
      html.push(`<${list.tag}${start}>${list.items.map(item => `<li>${inlineHtml(item, find)}</li>`).join("")}</${list.tag}>`);
    }
    list = undefined;
  };

  for (const rawLine of description.split(/\r\n?|\n/)) {
    const line = rawLine.trim();
    const item = /^([-*]|\d+[.)])\s+(.+)$/.exec(line);
    if (item) {
      endParagraph();
      const tag = /\d/.test(item[1]) ? "ol" : "ul";
      if (list?.tag !== tag) endList();
      // A number too big to be exact starts the list at 1.
      const number = parseInt(item[1], 10);
      list ??= {tag, ...(tag === "ol" && Number.isSafeInteger(number) ? {start: number} : {}), items: []};
      list.items.push(item[2]);
      continue;
    }
    endList();
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      endParagraph();
      const tag = `h${heading[1].length + 1}`;
      html.push(`<${tag}>${inlineHtml(heading[2], find)}</${tag}>`);
    } else if (line) {
      paragraph.push(line);
    } else {
      endParagraph();
    }
  }
  endParagraph();
  endList();
  return html.join("");
}
