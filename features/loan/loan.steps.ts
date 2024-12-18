import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from 'chai';
import { MifosWorld } from "features/world";
import { ClientPage } from "../../lib/pages/client.page";
import { LoanAccountPage } from "../../lib/pages/loan-account.page"

let clientPage: ClientPage;
let loanAccountPage: LoanAccountPage;

When('I create a loan', async function (this: MifosWorld) {
  const page = this.page!;
  clientPage = new ClientPage(page);

  await clientPage.goTo(this);

  await clientPage.createLoan();
});

Then('loan should be created successfully', async function (this: MifosWorld) {
  const page = this.page!;
  loanAccountPage = new LoanAccountPage(page);

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(7000);

  expect(await page.locator(loanAccountPage.loanType).nth(0).textContent()).to.contain("Home Loan(#HLP");
  expect (page.url()).to.contain("https://demo.mifos.io/#/viewloanaccount/");
});
