#!/usr/bin/env node
/**
 * Copies the built whitelabel-ds design system into vendor/whitelabel-ds, so Vercel can install it from
 * this repo (it can't reach the design system's own private repo).
 *
 * The design system is RichGriner1/WhitelabelDesignsystem, a private repo. Richard agreed (Nov 2026) that the
 * built files EUDA needs can be published in EUDA's public repo. Copy only those: not his source or docs.
 *
 * Usage (from euda-landing-page/):
 *   1. Pull and build the design system:  cd <clone> && git pull && npm run build
 *   2. node scripts/vendor-whitelabel-ds.mjs [path-to-clone]   (default: ~/dev/WhitelabelDesignsystem)
 *   3. npm install   (refreshes node_modules from the new copy)
 */
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const source = resolve(process.argv[2] ?? join(homedir(), "dev/WhitelabelDesignsystem"));
const target = resolve("vendor/whitelabel-ds");

const sourcePkg = JSON.parse(readFileSync(join(source, "package.json"), "utf8"));
const commit = execSync("git rev-parse --short HEAD", { cwd: source }).toString().trim();
const dirty = execSync("git status --porcelain", { cwd: source }).toString().trim() !== "";

rmSync(target, { recursive: true, force: true });
mkdirSync(join(target, "dist"), { recursive: true });

// Only what the landing page uses: the ES module build, its stylesheet and the type definitions.
// (Not the browser IIFE build, the docs or the EmptyState illustrations.)
cpSync(join(source, "dist/whitelabel-ds.js"), join(target, "dist/whitelabel-ds.js"));
cpSync(join(source, "dist/whitelabel-ds.css"), join(target, "dist/whitelabel-ds.css"));
cpSync(join(source, "src/index.d.ts"), join(target, "index.d.ts"));

writeFileSync(
    join(target, "package.json"),
    JSON.stringify(
        {
            name: "whitelabel-ds",
            version: sourcePkg.version,
            private: true,
            type: "module",
            main: "./dist/whitelabel-ds.js",
            module: "./dist/whitelabel-ds.js",
            types: "./index.d.ts",
            exports: {
                ".": { types: "./index.d.ts", default: "./dist/whitelabel-ds.js" },
                "./styles.css": "./dist/whitelabel-ds.css",
            },
            sideEffects: ["*.css", "./dist/whitelabel-ds.js"],
            peerDependencies: sourcePkg.peerDependencies,
        },
        null,
        2,
    ) + "\n",
);

writeFileSync(
    join(target, "VENDORED.md"),
    `# whitelabel-ds (vendored copy)

Built files copied from RichGriner1/WhitelabelDesignsystem (a private repo). Richard agreed that the built
files EUDA needs can be published here; the design system's source and docs stay private.

- Version: ${sourcePkg.version}
- Source commit: ${commit}${dirty ? " (with uncommitted local changes)" : ""}
- Copied: ${new Date().toISOString().slice(0, 10)}

Do not edit these files: change the design system in its own repo, rebuild it, then refresh this copy with
\`node scripts/vendor-whitelabel-ds.mjs\` (see the script for the steps).
`,
);

console.log(`Vendored whitelabel-ds ${sourcePkg.version} @ ${commit}${dirty ? " (dirty)" : ""} → ${target}`);
