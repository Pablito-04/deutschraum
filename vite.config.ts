import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
// GITHUB_REPOSITORY se recibe automáticamente en Actions; también acepta un prefijo explícito.
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base =
  process.env.VITE_BASE_PATH ||
  (repository && !repository.endsWith(".github.io") ? `/${repository}/` : "/");
function offline(): Plugin {
  return {
    name: "deutschraum-offline",
    async closeBundle() {
      const paths: string[] = [];
      async function walk(dir: string) {
        for (const e of await readdir(dir, { withFileTypes: true })) {
          const p = join(dir, e.name);
          if (e.isDirectory()) await walk(p);
          else if (!["sw.js", "manifest.webmanifest"].includes(e.name))
            paths.push(p.replace(/^dist\//, ""));
        }
      }
      await walk("dist");
      const hash = createHash("sha256");
      for (const p of paths) hash.update(await readFile(join("dist", p)));
      const version = hash.digest("hex").slice(0, 12);
      const manifest = {
        name: "Deutschraum · Alemán A0–A1",
        short_name: "Deutschraum",
        id: base,
        start_url: base + "#/",
        scope: base,
        display: "standalone",
        background_color: "#f6f5ef",
        theme_color: "#eeefe7",
        lang: "es",
        description: "Alemán con historias, práctica y repaso local.",
        icons: [
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      };
      await writeFile("dist/manifest.webmanifest", JSON.stringify(manifest));
      const urls = [
        base,
        ...paths.map((p) => base + p),
        base + "manifest.webmanifest",
      ];
      const prefix = `deutschraum-${base.replace(/[^a-z0-9]/gi, "_")}-`;
      await writeFile(
        "dist/sw.js",
        `const PREFIX=${JSON.stringify(prefix)},CACHE=PREFIX+${JSON.stringify(version)},URLS=${JSON.stringify(urls)};self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)))});self.addEventListener('message',e=>{if(e.data==='ACTIVATE')self.skipWaiting()});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(${JSON.stringify(base)}))return;e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true,ignoreVary:true});if(hit)return hit;try{return await fetch(e.request)}catch(err){if(e.request.mode==='navigate')return c.match(${JSON.stringify(base)});throw err}}))});`,
      );
    },
  };
}
export default defineConfig({
  base,
  plugins: [react(), offline()],
  server: { host: "127.0.0.1" },
  preview: { host: "127.0.0.1" },
  test: { include: ["src/tests/**/*.test.ts"] },
} as Parameters<typeof defineConfig>[0]);
