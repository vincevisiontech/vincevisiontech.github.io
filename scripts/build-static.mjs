/**
 * Static export build (GitHub Pages / S3 / any static host).
 *
 * Next.js `output: "export"` cannot emit dynamic Route Handlers (POST /api/chat),
 * so we temporarily move the API folder out of the app tree, build, then restore it.
 * In the static deployment the chat widget detects the missing endpoint and
 * falls back to the email/WhatsApp contact channels.
 */
import { existsSync, renameSync, rmSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "app", "api");
// Must live OUTSIDE app/ — dotfolders inside app/ are still collected as routes.
const parkedDir = path.join(root, ".api-disabled-park");

try {
  if (existsSync(apiDir)) {
    renameSync(apiDir, parkedDir);
    console.log("ℹ️  API route parked for static export");
  }
  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env, BUILD_STATIC: "1" },
  });
  console.log("✅ Static export complete → /out");
} finally {
  if (existsSync(parkedDir)) {
    if (existsSync(apiDir)) rmSync(apiDir, { recursive: true, force: true });
    renameSync(parkedDir, apiDir);
    console.log("ℹ️  API route restored");
  }
}
