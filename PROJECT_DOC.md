# Project Documentation: customvire

## Overview
This project is a Playwright-based end-to-end (E2E) testing and automation suite, primarily targeting web applications such as tashafe.com. It includes helpers for UI automation, custom fixtures, page object models, and utilities for tasks like automated screenshot capture from Excel input.

## Main Features
- **E2E Testing with Playwright**: Automated browser tests for validating UI and navigation flows.
- **Custom Helpers**: Reusable UI helpers for visibility, clickability, text assertions, and scrolling.
- **Page Object Model (POM)**: Encapsulates selectors and actions for maintainable test code.
- **Allure Reporting**: Integrated for rich test reporting and artifact attachment on failure.
- **Screenshot Automation**: Utility to capture screenshots of multiple pages and viewports, driven by Excel input.

## Directory Structure
- `tests/`
  - `regression/` — Main regression test suites and supporting files.
    - `action/` — Action classes (e.g., `HomeActions.js`) encapsulating user flows and assertions.
    - `helpers/` — Custom fixtures and test helpers (e.g., `custom.fixture.js`).
    - `pages/` — Page Object Model files (e.g., `HomePage.js`).
    - `spec/` — Test specifications (e.g., `Home.spec.js`).
  - `helpers/ui.js` — General UI helper functions for Playwright.
- `utils/`
  - `screenshotFromExcel.js` — Script to automate screenshots from Excel input.
- `screenshots/` — Output directory for screenshots, organized by page and viewport.
- `playwright.config.js` — Playwright configuration (testDir, reporters, retries, etc.).
- `package.json` — Project dependencies and scripts.

## Key Components
### 1. Playwright Test Suites
- Located in `tests/regression/spec/` and similar folders.
- Use custom fixtures and action classes for modular, readable tests.
- Example: `Home.spec.js` tests the hero banner on tashafe.com using `HomeActions`.

### 2. Action Classes
- Example: `HomeActions.js` encapsulates flows and assertions for the home page.
- Uses Allure for step reporting and attaches screenshots/page source on failure.
- Example methods: `openHomeAndWaitHero`, `validateHeroVisible`, `clickHeroCTAAndWaitNavigation`.

### 3. Page Object Model (POM)
- Example: `HomePage.js` exposes locator getters for hero carousel, heading, bullet items, and CTA.
- Used by action classes for robust, maintainable selectors.

### 4. Helpers and Fixtures
- `custom.fixture.js` extends Playwright's test context with custom actions.
- `ui.js` provides reusable helpers for visibility, clickability, text assertions, and scrolling.

### 5. Screenshot Automation
- `utils/screenshotFromExcel.js` reads `pages_to_capture.xlsx` and automates browser screenshots for each row (URL, width, height, selectors, etc.).
- Handles section scrolling, animation freezing, and error reporting.

## How to Run
- Install dependencies: `npm install`
- Run all tests: `npx playwright test`
- Run screenshot automation: `node utils/screenshotFromExcel.js`
- View reports: `npx playwright show-report` or check `allure-results/`

## Extending the Project
- Add new page objects in `tests/regression/pages/`.
- Add new action classes in `tests/regression/action/`.
- Write new test specs in `tests/regression/spec/`.
- Add new helpers to `tests/helpers/ui.js` as needed.

---

This documentation is auto-generated from code analysis. For more details, see code comments and each file's JSDoc.
