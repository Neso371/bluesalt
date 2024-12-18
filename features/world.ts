import { setDefaultTimeout, setWorldConstructor, World } from "@cucumber/cucumber";
import { login, saveStorageState } from "../lib/helpers/auth";
import { getAdminUserCredentials } from "../lib/helpers/user-credentials";
import { APIRequestContext, Browser, BrowserContext, chromium, LaunchOptions, Page, request } from "playwright";

export type WorldParameters = {
    env: "demo";
    url: string;
    apiUrl: string;
    headless: boolean;
};

export class MifosWorld extends World<WorldParameters> {
    browser: Browser | null = null;
    context: BrowserContext | null = null;
    page: Page | null = null;
    apiRequest: APIRequestContext | null = null;
    client: any | null = null;
    firstName: string | null = null;
    lastName: string | null = null;
    
    async initialize(options?: LaunchOptions) {
        this.browser = await chromium.launch({
            headless: process.env.CI ? true : this.parameters.headless,
            ...options,
        });
        this.apiRequest = await request.newContext({ baseURL: this.parameters.apiUrl });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        const adminCred = getAdminUserCredentials();
        const loginDetails = await login(adminCred.username!, adminCred.password!);
        await saveStorageState(loginDetails, ".auth/admin-user.json");
    }

    async cleanup() {
        if (this.context) {
            await this.context.close();
        }
        if (this.browser) {
            await this.browser.close();
        }
        if (this.apiRequest) {
            await this.apiRequest.dispose();
        }
    }
}

setDefaultTimeout(120000);
setWorldConstructor(MifosWorld);
