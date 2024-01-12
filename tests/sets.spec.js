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
  const sets = await page.$$eval(".flashcard-set", sets => sets.length);
  expect(sets).toEqual(0);
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
  const setsBefore = await page.$$eval(".flashcard-set", sets => sets.length);

  // create new set
  await page.getByTestId("create-set-btn").click();

  await expect(page).toHaveURL("http://localhost:3000/create"); // confirm successful navigation to set creation view

  // fill in form to create set
  await page.getByTestId("set-title").type(`Set #${setsBefore + 1}`);
  await page.getByTestId("set-description").type("set created by playwright automation");
  await page.getByTestId("card-term-1").type("term 1");
  await page.getByTestId("card-definition-1").type("definition 1");

  await page.getByTestId("submit-set").click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard"); // confirm successful redirection to dashboard
  await page.waitForTimeout(3000); // wait a bit due to flakiness

  // ensure # of sets increment by 1, and the newly created set title is visible

  const setsAfter = await page.$$eval(".flashcard-set", sets => sets.length);
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
  const setCount = await page.$$eval(".flashcard-set", sets => sets.length);
  expect(setCount).toEqual(1);
});

test("the dashboard displays the correct number of sets belonging to an existing user (3)", async () => {
  const user = {
    username: process.env.TEST_USER_USERNAME_THREE_SETS,
    password: process.env.TEST_USER_PASSWORD_THREE_SETS
  };

  await login(page, user.username, user.password);
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  // count total # of sets
  const setCount = await page.$$eval(".flashcard-set", sets => sets.length);
  expect(setCount).toEqual(3);
});

test(`
  User logs in, interacts with a two-card set, successfully flips cards, 
  navigates, and validates terms, covering key functionalities of SetView
`, async () => {
  const user = {
    username: process.env.TEST_USER_USERNAME_ONE_SET,
    password: process.env.TEST_USER_PASSWORD_ONE_SET
  };

  await login(page, user.username, user.password);
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  // Dashboard component

  const setEl = await page.getByTestId("dashboard-set-161");
  await setEl.click();

  await expect(page).toHaveURL("http://localhost:3000/sets/161");

  // SetView component

  // check # of cards in set, expected 2
  const cardCount = await page.getByTestId("set-card-count").textContent();
  expect(cardCount).toEqual("2");

  // verify card flipping function working as expected. first, check definition is hidden and term is not hidden
  let term1 = await page.getByTestId("card-term").textContent();
  let definition1 = await page.getByTestId("card-definition");

  expect(term1).toEqual("term 1");
  expect(definition1).toBeHidden();

  // flip card, check for the reverse
  const card = await page.getByTestId("card");
  await card.click();

  term1 = await page.getByTestId("card-term");
  definition1 = await page.getByTestId("card-definition").textContent();

  expect(term1).toBeHidden();
  expect(definition1).toEqual("definition 1");

  // navigate to next card and confirm successful navigation by making assertions on both sides
  const nextCardArrow = await page.getByTestId("navigate-next");
  const prevCardArrow = await page.getByTestId("navigate-prev");

  await nextCardArrow.click();

  let term2 = await page.getByTestId("card-term").textContent();
  let definition2 = await page.getByTestId("card-definition");

  expect(term2).toEqual("term 2");
  expect(definition2).toBeHidden();

  await card.click();

  term2 = await page.getByTestId("card-term");
  definition2 = await page.getByTestId("card-definition").textContent();

  expect(term2).toBeHidden();
  expect(definition2).toEqual("definition 2");

  // test navigating backwards and looping around the set
  await prevCardArrow.click();

  // back to the first card, term 1 should be showing
  let termShowing = await page.getByTestId("card-term").textContent();
  expect(termShowing).toEqual("term 1");

  // go back one more, since we were on the first card, this should take us to the second card
  await prevCardArrow.click();

  termShowing = await page.getByTestId("card-term").textContent();
  expect(termShowing).toEqual("term 2");

  // going forward from the last term should take us back to the first term in the set
  await nextCardArrow.click();

  termShowing = await page.getByTestId("card-term").textContent();
  expect(termShowing).toEqual("term 1");
});

test("user enters invalid URL (non-existing set), expect error modal with go back functionality", async () => {
  const user = {
    username: process.env.TEST_USER_USERNAME,
    password: process.env.TEST_USER_PASSWORD
  };

  await login(page, user.username, user.password);

  // confirm successful login before continuing
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  await page.goto('http://localhost:3000/sets/123507213578238751234');

  // expect error modal with appropriate error message
  const errorStatus = await page.getByTestId("error-status").textContent();
  const errorMsg = await page.getByTestId("error-msg").textContent();

  expect(errorStatus).toEqual("404 - Not found")
  expect(errorMsg).toEqual("The flash card set you requested does not exist - please go back and try looking for it again")
  
  // go back functionality
  const goBack = await page.getByTestId("go-back");
  await goBack.click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard");

});