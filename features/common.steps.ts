import { faker } from "@faker-js/faker";
import { Given, When } from "@cucumber/cucumber";
import { expect } from 'chai';
import { MifosWorld } from "features/world";
import { setStorageState } from "../lib/helpers/auth";
import { HomePage } from "../lib/pages/home.page";
import { createClient } from "../lib/helpers/client";

let homePage: HomePage;

Given('I am logged in to Mifos web app', async function (this: MifosWorld) {
  const page = this.page!;

  await setStorageState(page);

  homePage = new HomePage(page);
  
  await homePage.goto(page, this.parameters.url);

  expect((await page.locator(homePage.usernameDropdown).textContent())?.trim()).to.equal("mifos");
});

When('I create and activate a client', async function (this: MifosWorld) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const client = await createClient(1, firstName, lastName, true);

  this.client = client;
  this.firstName = firstName;
  this.lastName = lastName;
});
