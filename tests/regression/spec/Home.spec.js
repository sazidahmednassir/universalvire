const { test, expect } = require('../helpers/custom.fixture');

test.describe('Home Hero Banner', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.home.openHomeAndWaitHero();
  });

  test('renders hero banner on homepage', async ({ actions }) => {
    await actions.home.validateHeroVisible();
  });

  test('displays a non-empty hero heading', async ({ actions }) => {
    await actions.home.validateHeroHeadingPresent();
  });

  test('shows at least one hero bullet item', async ({ actions }) => {
    await actions.home.validateHeroBulletsPresent();
  });

  test('shows hero CTA with expected text and link', async ({ actions }) => {
    await actions.home.validateHeroCTAVisible();
    await actions.home.validateHeroCTATextContains('Step Into Healing');
    await actions.home.validateHeroCTALinkContains('/therapy-groups');
  });

  test('navigates to CTA destination when clicked', async ({ actions, page }) => {
    await actions.home.validateHeroCTAVisible();
    await actions.home.clickHeroCTAAndWaitNavigation();
    await expect(page).toHaveURL(/\/therapy-groups\/?/);
  });
});
