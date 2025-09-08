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



  async validateHeaderMenuNavigation() {
    return this._step('Validate header menu navigation', async () => {
      
      const menuTabs = [
        { name: 'Therapy-Groups', urlPart: '/therapy-groups', heading: 'Therapy-Groups' },
        { name: 'Blog', urlPart: '/blog-grid-style', heading: 'Our Blog' },
        { name: 'Contact', urlPart: '/contact', heading: 'Contact' },
        { name: 'About Us', urlPart: '/about-us', heading: 'About Us' }
      ];

      for (const tab of menuTabs) {
        const headerMenu = this.page.locator('#menu-main-menu-3');
        await headerMenu.getByRole('link', { name: tab.name, exact: true }).click();
        await expect(this.page).toHaveURL(new RegExp(tab.urlPart, 'i'));
        if (tab.name === 'Contact') {
          await expect(this.page.getByRole('heading', { name: 'Contact', exact: true })).toBeVisible();
        } else {
          await expect(this.page.getByRole('heading', { name: new RegExp(tab.heading, 'i') })).toBeVisible();
        }
        await this.page.goto('https://tashafe.com/');
      }
    });
  }

  async validateHomeBannerAndNextSectionVisible() {
    return this._step('Validate home banner and next section visible', async () => {
      // Validate hero/banner section is visible
      await expect(HomePage.heroCarousel(this.page)).toBeVisible();
      // Validate the section after the hero/banner is visible
      const nextSection = this.page.locator('.elementor-section').nth(1); // Adjust selector if needed
      await expect(nextSection).toBeVisible();
    });
  }

  async validateAboutUsSection() {    
    return this._step('Validate About Us section visibility', async () => {
      const userFriendlyText = HomePage.aboutImageText(this.page);
      await userFriendlyText.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      await expect(userFriendlyText).toBeVisible({ timeout: 10000 });

      const aboutUsHeading = HomePage.aboutHeading(this.page);
      await aboutUsHeading.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      await expect(aboutUsHeading).toBeVisible({ timeout: 10000 });
    });
  }

}

module.exports = { HomeActions };
