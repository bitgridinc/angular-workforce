"use strict";

var locators = new (require('./locators.js'))();

module.exports = function login(username, password) {
  browser.findElement(locators.usernameInput).sendKeys(username);
  browser.findElement(locators.passwordInput).sendKeys(password);
  browser.findElement(locators.submitButton).click();
};
