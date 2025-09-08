const { test, expect } = require('../helpers/custom.fixture');

test.describe('Home Hero Banner', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.home.openHomeAndWaitHero();
  });

  test('Header menu tabs navigate correctly on tashafe.com', async ({ actions }) => {
    await actions.home.validateHeaderMenuNavigation()
  }
  );

  test('Hero banner elements are visible and correct on tashafe.com', async ({ actions }) => {
    // Verify hero carousel is visible
    await actions.home.validateHomeBannerAndNextSectionVisible();
  });

  test('Validate About Us section loads after scrolling to user-friendly platform text', async ({ actions }) => {

   await actions.home.validateAboutUsSection();

  });

});
