const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

const fixturesDir = path.join(__dirname, "serp-fixtures");
const outDir = path.join(__dirname, "..", "public", "blog");

const shots = [
  { file: "serp-google-informational.png", fixture: "google-informational.html" },
  { file: "serp-google-navigational.png", fixture: "google-navigational.html" },
  { file: "serp-google-shopping.png", fixture: "google-shopping.html" },
  { file: "peer-outdoor-retail.png", fixture: "peer-outdoor-retail.html" },
  { file: "peer-guides-library.png", fixture: "peer-guides-library.html" },
  { file: "peer-brand-destination.png", fixture: "peer-brand-destination.html" },
  { file: "peer-mixed-global.png", fixture: "peer-mixed-global.html" },
  { file: "peer-support-help.png", fixture: "peer-support-help.html" },
  { file: "peer-promo-boost.png", fixture: "peer-promo-boost.html" },
  { file: "peer-refinement.png", fixture: "peer-refinement.html" },
  { file: "peer-conversation.png", fixture: "peer-conversation.html" },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const shot of shots) {
    const url = pathToFileURL(path.join(fixturesDir, shot.fixture)).href;
    console.log("capturing", shot.file);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: "load" });
    const contentHeight = await page.evaluate(
      () => Math.ceil(document.documentElement.getBoundingClientRect().height)
    );
    const height = Math.min(Math.max(contentHeight + 8, 640), 1000);
    await page.setViewportSize({ width: 1280, height });
    await page.screenshot({
      path: path.join(outDir, shot.file),
      fullPage: false,
      animations: "disabled",
    });
    console.log("wrote", shot.file, `1280x${height}`);
  }

  await browser.close();
})();
