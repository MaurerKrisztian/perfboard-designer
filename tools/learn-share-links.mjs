// Keeps the learn/ articles' "open this board" links in step with the example projects.
//
// The articles open the 555 blinker examples by share link, a `z=` fragment that carries the whole
// project file (src/project-file/share-link.ts). A copy pasted into a page goes stale when the
// example changes, so this rewrites every such link from examples/*.json:
//
//   node tools/learn-share-links.mjs           rewrite the links that no longer match
//   node tools/learn-share-links.mjs --check   only report them, and exit 1 if any are stale
//
// A link is matched to its example by its name (`name=`), as in LINKED_EXAMPLES. Plain Node, no
// dependencies.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync, inflateRawSync } from "node:zlib";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// A link's project name → the example file it opens.
const LINKED_EXAMPLES = {
  "555 blinker": "examples/perfboard-555-blinker.json",
  "555 blinker (stripboard)": "examples/stripboard-555-blinker.json",
};

// A share link in a page's HTML: `#name=<name>&amp;z=<payload>` (or a plain `&`).
const SHARE_LINK = /#name=([^&"]*)&(?:amp;)?z=([A-Za-z0-9_-]+)/g;

const check = process.argv.includes("--check");

const examples = Object.fromEntries(
  Object.entries(LINKED_EXAMPLES).map(([name, file]) => {
    const json = JSON.stringify(
      JSON.parse(readFileSync(join(ROOT, file), "utf8"))
    );
    return [
      name,
      {
        file,
        json,
        payload: deflateRawSync(Buffer.from(json)).toString("base64url"),
      },
    ];
  })
);

function pages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory()
      ? pages(path)
      : entry.name.endsWith(".html")
      ? [path]
      : [];
  });
}

// The project file a `z=` payload carries, as compact JSON, or undefined when it can't be read.
function decode(payload) {
  try {
    return JSON.stringify(
      JSON.parse(
        inflateRawSync(Buffer.from(payload, "base64url")).toString("utf8")
      )
    );
  } catch {
    return undefined;
  }
}

let stale = 0;
let total = 0;
for (const page of pages(join(ROOT, "learn"))) {
  const html = readFileSync(page, "utf8");
  const updated = html.replace(SHARE_LINK, (link, rawName, payload) => {
    const name = decodeURIComponent(rawName);
    const example = examples[name];
    if (!example) {
      console.warn(
        `${relative(
          ROOT,
          page
        )}: a link to "${name}", which names no example here`
      );
      return link;
    }
    total++;
    if (decode(payload) === example.json) return link;
    stale++;
    console.log(
      `${relative(ROOT, page)}: "${name}" doesn't match ${example.file}${
        check ? "" : ", rewritten"
      }`
    );
    return link.slice(0, link.length - payload.length) + example.payload;
  });
  if (!check && updated !== html) writeFileSync(page, updated);
}

console.log(
  `${total} example link${total === 1 ? "" : "s"}, ${stale} stale${
    check || !stale ? "" : ", now rewritten"
  }.`
);
if (check && stale) process.exit(1);
