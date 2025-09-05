const { expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

class HomeActions {
  constructor(page) {
    this.page = page;
  }

  async openHomeAndWaitHero() {
    await this.page.goto('https://tashafe.com/');
    await expect(HomePage.heroCarousel(this.page)).toBeVisible();
  }

  async validateHeroVisible() {
    await expect(HomePage.heroCarousel(this.page)).toBeVisible();
  }

  async validateHeroHeadingPresent() {
    const text = (await HomePage.heroHeading(this.page).first().textContent())?.trim();
    expect(text && text.length).toBeTruthy();
  }

  async validateHeroBulletsPresent() {
    const count = await HomePage.heroBulletItems(this.page).count();
    expect(count).toBeGreaterThan(0);
  }

  async validateHeroCTAVisible() {
    await expect(HomePage.heroCTA(this.page)).toBeVisible();
  }

  async validateHeroCTATextContains(expected) {
    const actual = (await HomePage.heroCTA(this.page).first().innerText())?.trim();
    expect(actual).toContain(expected);
  }

  async validateHeroCTALinkContains(pathPart) {
    const href = await HomePage.heroCTA(this.page).first().getAttribute('href');
    expect(href).toContain(pathPart);
  }

  async clickHeroCTAAndWaitNavigation() {
    const [nav] = await Promise.all([
      this.page.waitForLoadState('load'),
      HomePage.heroCTA(this.page).first().click(),
    ]);
    return nav;
  }
}

module.exports = { HomeActions };
