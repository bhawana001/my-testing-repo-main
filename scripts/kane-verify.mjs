// Runs Kane CLI tests sequentially against production and records the outcome
// in tests/status.json ("verified" on pass, "failed" otherwise).
// Sequential on purpose: parallel local testmd runs share one Chrome profile.
// Usage: node scripts/kane-verify.mjs [--live-unverified] [entity/flow ...]
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FLOWS } from "../lib/registry.js";
import { hasFlow } from "../lib/flow-loaders.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATUS = path.join(ROOT, "tests", "status.json");
const LOGDIR = process.env.KANE_LOG_DIR || path.join(ROOT, ".testmuai", "verify-logs");
fs.mkdirSync(LOGDIR, { recursive: true });
const readStatus = () => (fs.existsSync(STATUS) ? JSON.parse(fs.readFileSync(STATUS, "utf8")) : {});

const args = process.argv.slice(2);
let keys = args.filter((a) => !a.startsWith("--"));
const maxDayArg = args.find((a) => a.startsWith("--max-day="));
const maxDay = maxDayArg ? Number(maxDayArg.split("=")[1]) : Infinity;
if (args.includes("--live-unverified")) {
  const st = readStatus();
  keys = [...keys, ...FLOWS.filter((f) => f.day <= maxDay).map((f) => `${f.entitySlug}/${f.slug}`).filter((k) => hasFlow(k) && st[k] !== "verified" && !keys.includes(k))];
}
for (const key of keys) {
  const f = FLOWS.find((x) => `${x.entitySlug}/${x.slug}` === key);
  if (!f) { console.log(`SKIP ${key} (not in registry)`); continue; }
  const started = Date.now();
  const r = spawnSync("kane-cli", ["testmd", "run", f.testPath, "--agent", "--headless", "--assertion-mode", "dom", "--timeout", "600", "--max-steps", "45"], {
    cwd: ROOT, encoding: "utf8", env: { ...process.env, KANE_CLI_USER_AGENT: process.env.KANE_CLI_USER_AGENT || "claude-code" }, maxBuffer: 64 * 1024 * 1024,
  });
  const out = r.stdout || "";
  fs.writeFileSync(path.join(LOGDIR, key.replace("/", "__") + ".ndjson"), out);
  fs.writeFileSync(path.join(LOGDIR, key.replace("/", "__") + ".err"), r.stderr || String(r.error || ""));
  const errTail = String(r.stderr || r.error || "").split("\n").map((l) => l.trim()).filter((l) => l && !/update available|install skill|^evidence:/i.test(l)).slice(-1)[0] || "";
  let overall = null, failedStep = null, reason = "";
  for (const line of out.split("\n")) {
    if (!line.trim().startsWith("{")) continue;
    try {
      const d = JSON.parse(line);
      if (d.type === "test_md_done") overall = d.overall_status;
      if (d.type === "test_md_step_end" && d.status === "failed" && failedStep == null) failedStep = d.step_index;
      if (d.type === "run_end" && d.status === "failed" && !reason) reason = String(d.summary || d.reason || "").split("\n")[0].slice(0, 200);
      if (d.type === "error" && !reason) reason = String(d.message || "").slice(0, 200);
    } catch {}
  }
  const passed = r.status === 0 && overall === "passed";
  const st = readStatus();
  st[key] = passed ? "verified" : "failed";
  fs.writeFileSync(STATUS, JSON.stringify(Object.fromEntries(Object.entries(st).sort()), null, 2) + "\n");
  const secs = Math.round((Date.now() - started) / 1000);
  console.log(`DONE ${key} ${passed ? "PASS" : "FAIL"} exit=${r.status} ${secs}s${passed ? "" : ` step=${failedStep} | ${reason || errTail.slice(0, 200)}`}`);
}
console.log("ALL_DONE");
