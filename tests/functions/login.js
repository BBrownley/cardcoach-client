/*

Navigates to login form by accessing homepage, and clicking the login btn
It then automates the login by taking in username, password fields

*/

const login = async (page, username, password) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("nav-login").click();

  await page.getByTestId("username-field").type(username);
  await page.getByTestId("password-field").type(password);

  await page.getByTestId("login-btn").click();
};

module.exports = login;
