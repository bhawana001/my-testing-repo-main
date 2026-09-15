// Runs Kane CLI tests sequentially against production and records the outcome
// in tests/status.json ("verified" on pass, "failed" otherwise).
// Sequential on purpose: parallel local testmd runs share one Chrome profile.
// Usage: node scripts/kane-verify.mjs [--live-unverified] [entity/flow ...]
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FLOWS } from "../lib/registry.js";
import { hasFlow } from "../lib/flow-loaders.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATUS = path.join(ROOT, "tests", "status.json");
const LOGDIR = process.env.KANE_LOG_DIR || path.join(ROOT, ".testmuai", "verify-logs");
fs.mkdirSync(LOGDIR, { recursive: true });

// Runs a child in its own process group and kills the ENTIRE group on timeout.
// spawnSync's `timeout` is not usable here: it kills only the direct child, then
// keeps blocking on the stdout pipe that the v16-runner grandchild still holds
// open -- which is how tests ran for hours despite a 720s cap.
function runCapped(cmd, argv, opts, capMs) {
  return new Promise((resolve) => {
    const child = spawn(cmd, argv, { ...opts, detached: true, stdio: ["ignore", "pipe", "pipe"] });
    let out = "", err = "", capped = false, done = false;
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (d) => { if (out.length < 64e6) out += d; });
    child.stderr.on("data", (d) => { if (err.length < 4e6) err += d; });
    const finish = (status, signal) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve({ stdout: out, stderr: err, status, signal, capped });
    };
    const timer = setTimeout(() => {
      capped = true;
      try { process.kill(-child.pid, "SIGKILL"); } catch {}
      try { child.kill("SIGKILL"); } catch {}
      setTimeout(() => finish(null, "SIGKILL"), 3000);
    }, capMs);
    child.on("error", (e) => { err += String(e); finish(null, null); });
    child.on("exit", (code, sig) => setTimeout(() => finish(code, sig), 250));
  });
}

const readStatus = () => (fs.existsSync(STATUS) ? JSON.parse(fs.readFileSync(STATUS, "utf8")) : {});

const args = process.argv.slice(2);
let keys = args.filter((a) => !a.startsWith("--"));
const maxDayArg = args.find((a) => a.startsWith("--max-day="));
const maxDay = maxDayArg ? Number(maxDayArg.split("=")[1]) : Infinity;
const limitArg = args.find((a) => a.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const capArg = args.find((a) => a.startsWith("--cap="));
const capSecs = capArg ? Number(capArg.split("=")[1]) : 900;
if (args.includes("--live-unverified")) {
  const st = readStatus();
  keys = [...keys, ...FLOWS.filter((f) => f.day <= maxDay).map((f) => `${f.entitySlug}/${f.slug}`).filter((k) => hasFlow(k) && st[k] !== "verified" && !keys.includes(k))];
}
if (keys.length > limit) keys = keys.slice(0, limit);
console.log("QUEUE " + keys.length + " test(s), hard cap " + capSecs + "s each");
for (const key of keys) {
  const f = FLOWS.find((x) => `${x.entitySlug}/${x.slug}` === key);
  if (!f) { console.log(`SKIP ${key} (not in registry)`); continue; }
  const started = Date.now();
  const r = await runCapped("kane-cli", ["testmd", "run", f.testPath, "--agent", "--headless", "--assertion-mode", "dom", "--timeout", "600", "--max-steps", "45"], {
    cwd: ROOT, env: { ...process.env, KANE_CLI_USER_AGENT: process.env.KANE_CLI_USER_AGENT || "claude-code" },
  }, capSecs * 1000);
  const out = r.stdout || "";
  fs.writeFileSync(path.join(LOGDIR, key.replace("/", "__") + ".ndjson"), out);
  fs.writeFileSync(path.join(LOGDIR, key.replace("/", "__") + ".err"), r.stderr || "");
  const errTail = String(r.stderr || "").split("\n").map((l) => l.trim()).filter((l) => l && !/update available|install skill|^evidence:/i.test(l)).slice(-1)[0] || "";
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
  const capped = r.capped;
  const passed = r.status === 0 && overall === "passed" && !capped;
  const st = readStatus();
  st[key] = passed ? "verified" : "failed";
  fs.writeFileSync(STATUS, JSON.stringify(Object.fromEntries(Object.entries(st).sort()), null, 2) + "\n");
  const secs = Math.round((Date.now() - started) / 1000);
  console.log(`DONE ${key} ${passed ? "PASS" : "FAIL"} exit=${r.status} ${secs}s${passed ? "" : capped ? " CAPPED (hard timeout)" : ` step=${failedStep} | ${reason || errTail.slice(0, 200)}`}`);
}
console.log("ALL_DONE");
