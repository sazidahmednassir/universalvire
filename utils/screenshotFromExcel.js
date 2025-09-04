const { chromium } = require('playwright');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

async function walkSections(page, {
  selectors = ['section', '[data-section]', '.section'],
  delayMs = 600,
  maxSections = 50,
} = {}) {
  const locator = page.locator(selectors.join(','));
  const count = Math.min(await locator.count(), maxSections);
  for (let i = 0; i < count; i++) {
    const el = locator.nth(i);
    try {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(delayMs);
    } catch {}
  }
}

async function freezeAnimations(page) {
  // Disable CSS transitions/animations and pause runtime animations/media
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
      }
      html { scroll-behavior: auto !important; }
    `
  });
  await page.evaluate(() => {
    try {
      const anims = (document.getAnimations ? document.getAnimations({ subtree: true }) : []) || [];
      anims.forEach(a => { try { a.pause(); } catch {} });
    } catch {}
    try {
      document.querySelectorAll('video, audio').forEach(m => { try { m.pause(); } catch {} });
    } catch {}
  });
}

(async () => {
  const browser = await chromium.launch();

  // Load Excel file
  const workbook = XLSX.readFile('pages_to_capture.xlsx');
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Define base output folder
  const baseDir = path.resolve(__dirname, '..', 'screenshots');
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

  for (const row of data) {
    const url = row.URL?.trim();
    const width = parseInt(row.Width);
    const height = parseInt(row.Height);

    if (!url || isNaN(width) || isNaN(height)) {
      console.warn(`⚠️ Skipping invalid row: ${JSON.stringify(row)}`);
      continue;
    }

    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();

    try {
      // 1) Go to the page
      await page.goto(url, { waitUntil: 'load' });

      // 2) Refresh the page two or three times (default 2; spreadsheet can override with Reloads=2/3)
      const reloads = Math.min(Math.max(parseInt(row.Reloads) || 2, 2), 3);
      for (let i = 0; i < reloads; i++) {
        try {
          await page.reload({ waitUntil: 'domcontentloaded' });
        } catch {}
      }

      // Safe folder name from URL
      const folderName = url.replace(/https?:\/\//, '').replace(/[^\w]/g, '_');
      const folderPath = path.join(baseDir, folderName);
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

      const fileName = `screenshot_${width}x${height}.png`;
      const screenshotPath = path.join(folderPath, fileName);

      // 3) Handle section animations: walk sections to trigger in-view effects, then freeze animations
      const sectionSelectors = (row.Selectors && String(row.Selectors).split(',').map(s => s.trim()).filter(Boolean))
        || ['section', '[data-section]', '.section'];
      const sectionDelay = Number.isFinite(Number(row.SectionDelayMs)) ? Number(row.SectionDelayMs) : 600;
      await walkSections(page, { selectors: sectionSelectors, delayMs: sectionDelay });
      await freezeAnimations(page);
      await page.evaluate(() => window.scrollTo(0, 0));

      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`✅ Saved: ${screenshotPath}`);
    } catch (err) {
      console.error(`❌ Error at ${url} (${width}x${height}):`, err);
    }

    await context.close();
  }

  await browser.close();
})();
