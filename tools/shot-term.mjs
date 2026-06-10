import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/twink/kwork-agent/package.json");
const { chromium } = require("playwright");

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.env.SHOT_URL || "http://localhost:8080", { waitUntil: "networkidle" });

// дождаться монтирования интерактивного инпута (после typewriter)
await page.waitForSelector(".term__input", { timeout: 15000 });
const input = page.locator(".term__input");

const cmds = (process.env.CMDS || "help|ls|cd cats|ls|cat maine-coon.txt|woof|neofetch").split("|");
for (const c of cmds) {
  await input.click();
  await input.type(c, { delay: 18 });
  await input.press("Enter");
  await page.waitForTimeout(450);
}
await page.waitForTimeout(600);
await page.locator(".term--hero").screenshot({ path: "shots/term.png" });
await browser.close();
console.log("done");
