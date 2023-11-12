require("dotenv").config({ path: "../src/.env" });
const { test, expect } = require("@playwright/test");

let page;

test.beforeEach("login page navigation", async ({ browser }) => {
  page = await browser.newPage();

  // initialize app, go to log in page
  await page.goto("http://localhost:3000/");
  await page.getByTestId("nav-login").click();
});

test("client performs successful login", async () => {
  console.log(process.env.REACT_APP_TEST_USER_USERNAME);
  await page.getByTestId("username-field").type("testuser123");
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("login-btn").click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard"); // confirm successful login
});

test("client performs unsuccessful login by providing an invalid username", async () => {
  await page.getByTestId("username-field").type(process.env.TEST_USER_USERNAME_NOT_EXISTING);
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("login-btn").click();
  await expect(page.getByTestId("username-field-error")).toHaveText("Unknown username");
});

test("client performs unsuccessful login by providing an invalid password", async () => {
  await page.getByTestId("username-field").type(process.env.TEST_USER_USERNAME);
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD_WRONG);

  await page.getByTestId("login-btn").click();
  await expect(page.getByTestId("password-field-error")).toHaveText("Password is incorrect");
});

test("client performs unsuccessful login by providing an empty username input", async () => {
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("login-btn").click();
  await expect(page.getByTestId("username-field-error")).toHaveText("Username is required");
});

test("client performs unsuccessful login by providing an empty password input", async () => {
  await page.getByTestId("username-field").type(process.env.TEST_USER_USERNAME);

  await page.getByTestId("login-btn").click();
  await expect(page.getByTestId("password-field-error")).toHaveText("Password is required");
});

test("client performs unsuccessful login by providing both an empty username and password input", async () => {
  await page.getByTestId("login-btn").click();

  await expect(page.getByTestId("username-field-error")).toHaveText("Username is required");
  await expect(page.getByTestId("password-field-error")).toHaveText("Password is required");
});
