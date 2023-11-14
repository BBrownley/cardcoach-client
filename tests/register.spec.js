require("dotenv").config({ path: "../src/.env" });
const { test, expect } = require("@playwright/test");
const randomString = require("randomstring");

let page;

test.beforeEach("register page navigation", async ({ browser }) => {
  page = await browser.newPage();

  // initialize app, go to log in page
  await page.goto("http://localhost:3000/");
  await page.getByTestId("nav-register").click();
});

test("client performs successful registration", async () => {
  await page.getByTestId("username-field").type(`testuser${randomString.generate(12)}`);
  await page.getByTestId("email-field").type(`testuser${randomString.generate()}@email.com`);
  await page.getByTestId("password-field").type("12345678");
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard"); // confirm successful registration
});

test("client performs unsuccessful registration by providing an invalid email address", async () => {
  await page.getByTestId("username-field").type(`testuser${randomString.generate(12)}`);
  await page.getByTestId("email-field").type(`12345678@a`);
  await page.getByTestId("password-field").type("12345678");
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("email-field-error")).toHaveText("Email is invalid");
});

test("client performs unsuccessful registration, username field empty", async () => {
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("password-field").type("12345678");
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("username-field-error")).toHaveText("Username is required");
});

test("client performs unsuccessful registration, email field empty", async () => {
  await page.getByTestId("username-field").type(`testuser${randomString.generate(12)}`);
  await page.getByTestId("password-field").type("12345678");
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("email-field-error")).toHaveText("Email is required");
});

test("client performs unsuccessful registration, password field empty", async () => {
  await page.getByTestId("username-field").type(`testuser${randomString.generate(12)}`);
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("password-field-error")).toHaveText("Password is required");
});

test("client performs unsuccessful registration, confirm password field empty", async () => {
  await page.getByTestId("username-field").type("testuser123");
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("confirm-password-field-error")).toHaveText(
    "Confirm password is required"
  );
});

test("client performs unsuccessful registration, passwords do not match", async () => {
  await page.getByTestId("username-field").type("testuser123");
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("password-field").type("123456789");
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("confirm-password-field-error")).toHaveText(
    "Passwords do not match"
  );
});

test("client performs unsuccessful registration, password length too short", async () => {
  await page.getByTestId("username-field").type("testuser123");
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("password-field").type("1234567");
  await page.getByTestId("confirm-password-field").type("1234567");

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("password-field-error")).toHaveText(
    "Password must be at least 8 characters long"
  );
});

test("client performs unsuccessful registration, username in use", async () => {
  await page.getByTestId("username-field").type(process.env.TEST_USER_USERNAME);
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);
  await page.getByTestId("confirm-password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("username-field-error")).toHaveText("Username already taken");
});

test("client performs unsuccessful registration, email in use", async () => {
  await page.getByTestId("username-field").type(`testuser${randomString.generate(12)}`);
  await page.getByTestId("email-field").type(`emailtaken@email.com`);
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);
  await page.getByTestId("confirm-password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("email-field-error")).toHaveText("Email already taken");
});

test("client performs unsuccessful registration, username too long", async () => {
  await page.getByTestId("username-field").type(`testuser${randomString.generate(13)}`); // 21 chars, 20 max
  await page.getByTestId("email-field").type(`testuser${randomString.generate(12)}@email.com`);
  await page.getByTestId("password-field").type(process.env.TEST_USER_PASSWORD);
  await page.getByTestId("confirm-password-field").type(process.env.TEST_USER_PASSWORD);

  await page.getByTestId("register-btn").click();

  await expect(page.getByTestId("username-field-error")).toHaveText(
    "Username cannot be more than 20 characters"
  );
});
