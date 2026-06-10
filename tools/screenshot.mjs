import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/twink/kwork-agent/package.json");
const { chromium } = require("playwright");

const url = process.argv[2] || "http://localhost:8080";
const browser = await chromium.launch({ channel: "chrome" });
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 375, 740]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important} html.js .reveal{opacity:1!important;transform:none!important}" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log("done: shots/desktop.png, shots/mobile.png");
