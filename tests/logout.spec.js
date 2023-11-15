require("dotenv").config({ path: "../src/.env" });
const { test, expect } = require("@playwright/test");

let page;

test.beforeEach("login page navigation", async ({ browser }) => {
  page = await browser.newPage();

  // initialize app, go to log in page
  await page.goto("http://localhost:3000/");
  await page.getByTestId("nav-login").click();

  await page.getByTestId("username-field").type("testuser123");
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("login-btn").click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard"); // confirm successful login
});

test("client performs successful logout", async () => {
  await page.getByTestId("logout").click();

  await expect(page).toHaveURL("http://localhost:3000/"); // user re-directed to landing page
  await expect(page.getByTestId("login-register")).toBeVisible(); // login/register elements visible
});

test("client is prevented from accessing protected views after logging out", async () => {
  await page.getByTestId("logout").click();

  await page.goto("http://localhost:3000/dashboard");
  await expect(page.getByTestId("unauthorized")).toHaveText("Unauthorized access - please log in.");
});
