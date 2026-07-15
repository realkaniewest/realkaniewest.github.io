import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/twink/kwork-agent/package.json");
const { chromium } = require("playwright");

const url = process.argv[2] || "http://localhost:8080";
const browser = await chromium.launch({ channel: "chrome" });
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 375, 740]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      html{scroll-behavior:auto!important}
      *, *::before, *::after{transition:none!important;animation:none!important}
      html.js .reveal,
      html.js .reveal.is-visible,
      html.js .hero__text > *,
      html.js .hero__term,
      html.js .hero__proof > *,
      html.js .hero__signals > *,
      html.js .cards > *,
      html.js .fit-grid > *,
      html.js .router-shell > *,
      html.js .brief-lab > *,
      html.js .service-grid > *,
      html.js .formats-grid > *,
      html.js .proof-grid > *,
      html.js .chips > *,
      html.js .stats__grid > *,
      html.js .log-line,
      html.js .trust-grid > *,
      html.js .limits-panel > *,
      html.js .faq-shell > *,
      html.js .cta__inner > *,
      html.js .landing-lab > *{opacity:1!important;filter:none!important;transform:none!important}
    `,
  });
  await page.evaluate(() => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log("done: shots/desktop.png, shots/mobile.png");
