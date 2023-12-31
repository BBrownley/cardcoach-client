/*

Tests relating to fetching the user's sets

*/

require("dotenv").config({ path: "../src/.env" });
const { test, expect } = require("@playwright/test");
const register = require("./functions/register.js");
const login = require("./functions/login.js");

let page;

test.beforeEach("initial page load", async ({ browser }) => {
  page = await browser.newPage();
});

test("on user registration, the dashboard displays zero sets, and prompts the user to create one", async () => {
  await register(page);

  // user prompt display
  await expect(page.getByTestId("no-sets-prompt")).toHaveText(
    "You don't have any sets, try making your first one!"
  );

  // confirm no set objects are displayed
  const sets = await page.$$eval('.flashcard-set', sets => sets.length);
  expect(sets).toEqual(0)
});

test("on existing test user login, the dashboard displays a number of existing sets, and properly increments the amount by 1 after new set creation", async () => {
  const user = {
    username: process.env.TEST_USER_USERNAME,
    password: process.env.TEST_USER_PASSWORD
  };

  await login(page, user.username, user.password);

  // confirm successful login before counting
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  // count total # of sets
  const setsBefore = await page.$$eval('.flashcard-set', sets => sets.length); 

  // create new set
  await page.getByTestId("create-set-btn").click();

  await expect(page).toHaveURL("http://localhost:3000/create"); // confirm successful navigation to set creation view

  // fill in form to create set
  await page.getByTestId("set-title").type(`Set #${setsBefore + 1}`)
  await page.getByTestId("set-description").type("set created by playwright automation")
  await page.getByTestId("card-term-1").type("term 1")
  await page.getByTestId("card-definition-1").type("definition 1")

  await page.getByTestId("submit-set").click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard"); // confirm successful redirection to dashboard
  await page.waitForTimeout(3000); // wait a bit due to flakiness

  // ensure # of sets increment by 1, and the newly created set title is visible

  const setsAfter = await page.$$eval('.flashcard-set', sets => sets.length);
  expect(setsAfter).toEqual(setsBefore + 1);

  await page.getByText(`Set #${setsAfter}`);
});

test("the dashboard displays the correct number of sets belonging to an existing user (1)", async () => {
  const user = {
    username: process.env.TEST_USER_USERNAME_ONE_SET,
    password: process.env.TEST_USER_PASSWORD_ONE_SET
  };

  await login(page, user.username, user.password);
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  // count total # of sets
  const setCount = await page.$$eval('.flashcard-set', sets => sets.length); 
  expect(setCount).toEqual(1)
});

test("the dashboard displays the correct number of sets belonging to an existing user (3)", async () => {
  const user = {
    username: process.env.TEST_USER_USERNAME_THREE_SETS,
    password: process.env.TEST_USER_PASSWORD_THREE_SETS
  };

  await login(page, user.username, user.password);
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  // count total # of sets
  const setCount = await page.$$eval('.flashcard-set', sets => sets.length); 
  expect(setCount).toEqual(3)
});
