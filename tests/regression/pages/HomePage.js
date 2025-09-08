// Function-style POM: expose locator getters by page
const HomePage = {
  heroCarousel: (page) => page.locator('.wdt-cus-home2-slider'),
  heroHeading: (page) => page.locator('.wdt-cus-home2-slider-heading .wdt-heading-title'),
  heroBulletItems: (page) => page.locator('.wdt-cus-home2-slider-list .elementor-icon-list-item'),
  heroCTA: (page) => page.locator('.wdt-cus-home2-slider-button a.wdt-button'),
  aboutImageText: (page) => page.locator('text=/we also considered the importance of making the platform user-friendly and reflective of a spirit of collaboration and group support\\./i'),
  aboutHeading: (page) => page.locator("text=/let's walk this path together/i"),
};

module.exports = HomePage;