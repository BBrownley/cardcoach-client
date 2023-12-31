// To run test files, use the command: npx playwright test

require("dotenv").config({ path: "../src/.env" });
const { test, expect } = require("@playwright/test");
const login = require("./functions/login.js");

let page;

test.beforeEach("page initialization", async ({ browser }) => {
  page = await browser.newPage();
});

test("client performs successful login", async () => {
  const username = process.env.TEST_USER_USERNAME;
  const password = process.env.TEST_USER_PASSWORD;

  await login(page, username, password);

  await expect(page).toHaveURL("http://localhost:3000/dashboard"); // confirm successful login
});

test("client performs unsuccessful login by providing an invalid username", async () => {
  const username = process.env.TEST_USER_USERNAME_NOT_EXISTING;
  const password = process.env.TEST_USER_PASSWORD;

  await login(page, username, password);
  await expect(page.getByTestId("username-field-error")).toHaveText("Unknown username");
});

test("client performs unsuccessful login by providing an invalid password", async () => {
  const username = process.env.TEST_USER_USERNAME;
  const password = process.env.TEST_USER_PASSWORD_WRONG;

  await login(page, username, password);
  await expect(page.getByTestId("password-field-error")).toHaveText("Password is incorrect");
});

test("client performs unsuccessful login by providing an empty username input", async () => {
  const username = "";
  const password = process.env.TEST_USER_PASSWORD;

  await login(page, username, password);
  await expect(page.getByTestId("username-field-error")).toHaveText("Username is required");
});

test("client performs unsuccessful login by providing an empty password input", async () => {
  const username = process.env.TEST_USER_USERNAME;
  const password = "";

  await login(page, username, password);
  await expect(page.getByTestId("password-field-error")).toHaveText("Password is required");
});

test("client performs unsuccessful login by providing both an empty username and password input", async () => {
  const username = "";
  const password = "";

  await login(page, username, password);

  await expect(page.getByTestId("username-field-error")).toHaveText("Username is required");
  await expect(page.getByTestId("password-field-error")).toHaveText("Password is required");
});
