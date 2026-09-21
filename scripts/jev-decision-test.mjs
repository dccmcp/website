#!/usr/bin/env node
/**
 * Counter-framework decision test.
 *
 * Sends the same evidence to TypeSafe/Jev twice — once with our decision, once
 * with the opposite decision — then reports which questions changed answer.
 *
 * Read this before trusting the output:
 *   - A question that flips is NOT evidence that we are wrong. It means our
 *     evidence does not settle it: the model is following the framing.
 *   - A question that holds under both framings has real support in the
 *     evidence. Those are the only results worth treating as findings.
 *
 * Usage:  pnpm decision:test <case.json>        (needs TYPESAFE_API_KEY)
 *         pnpm decision:test <case.json> --dry  (print payloads, no API call)
 *
 * Case shape:
 * {
 *   "state": { "evidence": [ ... ] },     // shared, identical in both runs
 *   "decisions": [ "..." ],               // what we concluded
 *   "counter_decisions": [ "..." ],       // the opposite positions
 *   "questions": { "<id>": { "type": "noul|choice|score", ... } }
 * }
 */
import { existsSync, readFileSync } from "node:fs";

const ENDPOINT = "https://api.typesafe.ai/v1/systemone";
const MODEL = process.env.TYPESAFE_MODEL ?? "jev-latest";

/**
 * Read one key from .env.local without sourcing it — that file contains values
 * with characters a shell would interpret (angle brackets in an email address),
 * so `source` is not safe here.
 */
function fromDotEnvLocal(name) {
  const file = new URL("../.env.local", import.meta.url);
  if (!existsSync(file)) return undefined;
  const line = readFileSync(file, "utf8")
    .split("\n")
    .find((l) => l.startsWith(`${name}=`));
  return line?.slice(name.length + 1).trim();
}

const API_KEY = () => process.env.TYPESAFE_API_KEY ?? fromDotEnvLocal("TYPESAFE_API_KEY");

const [, , casePath, ...flags] = process.argv;
if (!casePath) {
  console.error("usage: pnpm decision:test <case.json> [--dry]");
  process.exit(2);
}

const dry = flags.includes("--dry");
const spec = JSON.parse(readFileSync(casePath, "utf8"));
const decisionsKey = spec.decisions_key ?? "our_decisions";

if (spec.decisions?.length !== spec.counter_decisions?.length) {
  console.error("decisions and counter_decisions must be the same length");
  process.exit(2);
}

function payload(decisions) {
  return {
    model: MODEL,
    state: { ...spec.state, [decisionsKey]: decisions },
    questions: spec.questions,
  };
}

async function evaluate(decisions, label) {
  const body = payload(decisions);
  if (dry) {
    console.log(`--- ${label} (dry run) ---\n${JSON.stringify(body, null, 2)}\n`);
    return null;
  }
  const key = API_KEY();
  if (!key) {
    console.error("TYPESAFE_API_KEY is not set. It lives in ~/.zshrc and the project .env.local.");
    process.exit(2);
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`${label}: HTTP ${res.status}\n${(await res.text()).slice(0, 600)}`);
    process.exit(1);
  }
  const json = await res.json();
  console.log(`${label}: ${json.model} · ${json.usage?.input_tokens ?? "?"} input tokens`);
  return json.answers;
}

const a = await evaluate(spec.decisions, "A our decision");
if (dry) process.exit(0);
const b = await evaluate(spec.counter_decisions, "B opposite decision");

const brief = (ans) => {
  if (ans.type === "choice") return `${ans.choice} (${ans.confidence?.toFixed(2)})`;
  if (ans.type === "noul") return ans.noul.toFixed(2);
  return `${ans.score.toFixed(2)} (${ans.confidence?.toFixed(2)})`;
};

let held = 0;
let flipped = 0;
const rows = [];

for (const id of Object.keys(spec.questions)) {
  const x = a[id];
  const y = b[id];
  let verdict;
  if (x.type === "choice") {
    const same = x.choice === y.choice;
    verdict = same ? "HELD" : "FOLLOWED THE FRAMING";
    same ? held++ : flipped++;
  } else {
    const dx = x.noul ?? x.score;
    const dy = y.noul ?? y.score;
    const move = Math.abs(dx - dy);
    if (move < 0.1) { verdict = `HELD (Δ${move.toFixed(2)})`; held++; }
    else if (move < 0.3) { verdict = `partly held (Δ${move.toFixed(2)})`; held++; }
    else { verdict = `FOLLOWED THE FRAMING (Δ${move.toFixed(2)})`; flipped++; }
  }
  rows.push({ id, ours: brief(x), counter: brief(y), verdict });
}

console.log("\n" + "─".repeat(100));
for (const r of rows) {
  console.log(`${r.id.padEnd(34)} ours: ${r.ours.padEnd(26)} counter: ${r.counter.padEnd(26)} ${r.verdict}`);
}
console.log("─".repeat(100));
console.log(`\n${held} held · ${flipped} flipped`);
console.log(
  "\nInterpretation: a question that HELD has support in the evidence. One that FOLLOWED THE\n" +
  "FRAMING means our evidence does not settle it — treat that decision as a bet, and look for\n" +
  "external evidence (customer interviews, market data) before locking it in.",
);
