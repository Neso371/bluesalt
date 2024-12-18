import { type Page } from "playwright";

export class LoanAccountPage {
  readonly loanType = ".gray-head";

  constructor (private readonly page: Page) {}
}
