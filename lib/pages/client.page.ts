import { expect } from "chai";
import { MifosWorld } from "features/world";
import { type Page } from "playwright";
import { getCurrentDate } from "../../lib/helpers/utility";

export class ClientPage {
  constructor (private readonly page: Page) {}

  async goTo(mifosWorld: MifosWorld) {
    await this.page.goto(`https://demo.mifos.io/#/viewclient/${mifosWorld.client.clientId}`);
    
    await this.page.waitForLoadState("networkidle");
    
    expect((await this.page.locator("h3.client-title").textContent())?.trim()).to.contain(`${mifosWorld.firstName} ${mifosWorld.lastName}`);
  }

  async createLoan() {
    const date = getCurrentDate();

    await this.page.getByRole('link', { name: 'New Loan' }).click();
    await this.page.locator('#productId').selectOption({ label: "Home Loan" });
    await this.page.locator('#expectedDisbursementDate').click();
    await this.page.getByRole('button', { name: date.day.toString() }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
