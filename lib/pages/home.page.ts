import { expect } from "chai";
import { type Page } from "playwright";

export class HomePage {
  readonly usernameDropdown = "#user-dropdown";

  constructor (public readonly page: Page) {}

  async goto(page: Page, url: string) {
    await page.goto(url);
  }
}
