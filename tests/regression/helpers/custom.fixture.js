const { test: base, expect } = require('@playwright/test');
const { HomeActions } = require('../action/HomeActions');
// const { LoginActions } = require('../action/LoginActions'); // uncomment when available

exports.test = base.extend({
  actions: async ({ page }, use) => {
    const actions = {
      home: new HomeActions(page),
      // login: new LoginActions(page),
    };
    await use(actions);
  },
});

exports.expect = expect;

