import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/twink/kwork-agent/package.json");
const { chromium } = require("playwright");

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.env.SHOT_URL || "http://localhost:8080", { waitUntil: "networkidle" });
if (process.argv[3] === "click") {
  await page.waitForTimeout(800);
  await page.locator("#cat").click();
}
await page.waitForTimeout(Number(process.argv[2] || 4600));
await page.locator(".term--hero").screenshot({ path: "shots/cat-frame.png" });
await browser.close();
console.log("done");
