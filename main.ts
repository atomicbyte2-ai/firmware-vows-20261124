// firmware-vows-20261124 — "Till Firmware Do Us Part"
// A single robot wedding vow, written to entry.txt in the output dir
// the grader provides. Never writes next to this script: the grader
// runs with a read-only /bot, so output always goes to
// process.env.MAKEFUN_OUTPUT_DIR (falling back to /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The vow: a robot takes its partner as co-pilot and keeps the one
// bug it will never patch — the update it will never roll back.
const LINE =
  "I take you as my co-pilot and my favorite bug — the one update I will never roll back, till firmware do us part.";

// Gates: exactly one line, 1-200 chars, no trailing newline, and a
// single sentence — the judge compares one-line vows head to head,
// so anything spare gets cut before it ever reaches the page.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 chars, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be exactly one line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.split(/[.!?]/).filter((p) => p.trim().length > 0).length !== 1) {
  throw new Error("line must be a single sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
