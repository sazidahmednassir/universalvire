const { expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const HomePage = require('../pages/HomePage');

class HomeActions {
  constructor(page) {
    this.page = page;
  }

  async _step(name, fn) {
    return allure.step(name, async () => {
      try {
        return await fn();
      } catch (error) {
        // Attach artifacts specifically for this failed action
        try {
          const screenshot = await this.page.screenshot({ fullPage: true });
          await allure.attachment(`${name} - screenshot`, screenshot, 'image/png');
        } catch (_) { /* ignore attachment errors */ }
        try {
          const html = await this.page.content();
          await allure.attachment(`${name} - page-source`, html, 'text/html');
        } catch (_) { /* ignore attachment errors */ }
        throw error;
      }
    });
  }

  async openHomeAndWaitHero() {
    return this._step('Open home and wait for hero', async () => {
      await this.page.goto('https://tashafe.com/');
      await expect(HomePage.heroCarousel(this.page)).toBeVisible();
    });
  }

  async validateHeroVisible() {
    return this._step('Validate hero is visible', async () => {
      await expect(HomePage.heroCarousel(this.page)).toBeVisible();
    });
  }

  async validateHeroHeadingPresent() {
    return this._step('Validate hero heading present', async () => {
      const text = (await HomePage.heroHeading(this.page).first().textContent())?.trim();
      expect(text && text.length).toBeTruthy();
    });
  }

  async validateHeroBulletsPresent() {
    return this._step('Validate hero bullet items present', async () => {
      const count = await HomePage.heroBulletItems(this.page).count();
      expect(count).toBeGreaterThan(0);
    });
  }

  async validateHeroCTAVisible() {
    return this._step('Validate hero CTA visible', async () => {
      await expect(HomePage.heroCTA(this.page)).toBeVisible();
    });
  }

  async validateHeroCTATextContains(expected) {
    return this._step('Validate hero CTA text', async () => {
      const actual = (await HomePage.heroCTA(this.page).first().innerText())?.trim();
      expect(actual).toContain(expected);
    });
  }

  async validateHeroCTALinkContains(pathPart) {
    return this._step('Validate hero CTA href', async () => {
      const href = await HomePage.heroCTA(this.page).first().getAttribute('href');
      expect(href).toContain(pathPart);
    });
  }

  async clickHeroCTAAndWaitNavigation() {
    return this._step('Click CTA and wait navigation', async () => {
      const [nav] = await Promise.all([
        this.page.waitForLoadState('load'),
        HomePage.heroCTA(this.page).first().click(),
      ]);
      return nav;
    });
  }
}

module.exports = { HomeActions };
