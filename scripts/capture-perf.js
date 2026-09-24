const { chromium } = require("playwright");
const path = require("path");
const { pathToFileURL } = require("url");

const fixturesDir = path.join(__dirname, "perf-fixtures");
const outDir = path.join(__dirname, "..", "public", "blog");

const shots = [
  { file: "perf-lighthouse.png", fixture: "lighthouse.html" },
  { file: "perf-treemap.png", fixture: "treemap.html" },
  { file: "perf-performance.png", fixture: "performance.html" },
  { file: "perf-network.png", fixture: "network.html" },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1000, height: 640 },
    deviceScaleFactor: 1,
  });

  for (const shot of shots) {
    const url = pathToFileURL(path.join(fixturesDir, shot.fixture)).href;
    await page.goto(url, { waitUntil: "load" });
    const height = await page.evaluate(
      () => Math.ceil(document.documentElement.getBoundingClientRect().height) + 8
    );
    await page.setViewportSize({ width: 1000, height: Math.min(Math.max(height, 420), 720) });
    await page.screenshot({
      path: path.join(outDir, shot.file),
      fullPage: false,
      animations: "disabled",
    });
    console.log("wrote", shot.file);
  }

  await browser.close();
})();
