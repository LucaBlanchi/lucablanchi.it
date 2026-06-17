import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_NODE = [22, 12, 0];
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const astroCli = join(rootDir, "node_modules", "astro", "bin", "astro.mjs");
const nvmDir = process.env.NVM_DIR || join(homedir(), ".nvm");

function parseVersion(value) {
  const match = String(value).match(/v?(\d+)\.(\d+)\.(\d+)/);

  return match ? match.slice(1).map(Number) : null;
}

function compareVersions(a, b) {
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const diff = (a[index] || 0) - (b[index] || 0);
    if (diff !== 0) return diff;
  }

  return 0;
}

function supportsAstro(version) {
  return version && compareVersions(version, REQUIRED_NODE) >= 0;
}

function readNodeVersion(nodePath) {
  const result = spawnSync(nodePath, ["-p", "process.versions.node"], {
    encoding: "utf8"
  });

  if (result.status !== 0) return null;

  return parseVersion(result.stdout.trim());
}

function addCandidate(candidates, nodePath, reason) {
  if (!nodePath || !existsSync(nodePath)) return;
  if (candidates.some((candidate) => candidate.path === nodePath)) return;

  candidates.push({ path: nodePath, reason });
}

function readNvmrc() {
  const nvmrcPath = join(rootDir, ".nvmrc");

  if (!existsSync(nvmrcPath)) return null;

  return readFileSync(nvmrcPath, "utf8").trim();
}

function addNvmCandidates(candidates) {
  const requested = readNvmrc();
  const versionsDir = join(nvmDir, "versions", "node");

  if (requested) {
    const normalized = requested.startsWith("v") ? requested : `v${requested}`;
    addCandidate(candidates, join(versionsDir, normalized, "bin", "node"), ".nvmrc");
  }

  if (!existsSync(versionsDir)) return;

  const installed = readdirSync(versionsDir)
    .filter((entry) => parseVersion(entry))
    .sort((a, b) => compareVersions(parseVersion(b), parseVersion(a)));

  for (const version of installed) {
    addCandidate(candidates, join(versionsDir, version, "bin", "node"), "nvm");
  }
}

function findNode() {
  const currentVersion = parseVersion(process.versions.node);

  if (supportsAstro(currentVersion)) {
    return {
      path: process.execPath,
      version: currentVersion,
      current: true
    };
  }

  const candidates = [];
  addNvmCandidates(candidates);
  addCandidate(candidates, "/usr/local/bin/node", "system");
  addCandidate(candidates, "/opt/homebrew/bin/node", "homebrew");

  for (const candidate of candidates) {
    const version = readNodeVersion(candidate.path);

    if (supportsAstro(version)) {
      return { ...candidate, version, current: false };
    }
  }

  return null;
}

if (!existsSync(astroCli)) {
  console.error("Astro is not installed. Run `npm install` first.");
  process.exit(1);
}

const node = findNode();

if (!node) {
  console.error("Astro requires Node.js >=22.12.0.");
  console.error("Install the version in .nvmrc with `nvm install`, then rerun this command.");
  process.exit(1);
}

if (!node.current) {
  console.error(
    `Using Node.js v${node.version.join(".")} from ${node.reason}; current shell is v${process.versions.node}.`
  );
}

const result = spawnSync(node.path, [astroCli, ...process.argv.slice(2)], {
  cwd: rootDir,
  env: process.env,
  stdio: "inherit"
});

process.exit(result.status ?? 1);
