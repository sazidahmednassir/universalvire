// Function-style POM: expose locator getters by page
const HomePage = {
  heroCarousel: (page) => page.locator('.wdt-cus-home2-slider'),
  heroHeading: (page) => page.locator('.wdt-cus-home2-slider-heading .wdt-heading-title'),
  heroBulletItems: (page) => page.locator('.wdt-cus-home2-slider-list .elementor-icon-list-item'),
  heroCTA: (page) => page.locator('.wdt-cus-home2-slider-button a.wdt-button'),
};

module.exports = HomePage;
