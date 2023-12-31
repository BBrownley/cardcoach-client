const randomString = require("randomstring");

/*

Navigates to registration form by accessing homepage, and clicking the register btn
It then automates the creation of a new user account using the form

*/

const register = async page => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("nav-register").click();

  await page.getByTestId("username-field").type(`testuser${randomString.generate(12)}`);
  await page.getByTestId("email-field").type(`testuser${randomString.generate()}@email.com`);
  await page.getByTestId("password-field").type("12345678");
  await page.getByTestId("confirm-password-field").type("12345678");

  await page.getByTestId("register-btn").click();
};

module.exports = register;
