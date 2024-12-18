import { expect } from "chai";
import fs from "fs";
import path from "path";
import { Page, request } from "playwright";

const authFile = ".auth/admin-user.json";

export async function login(username: string, password: string) {
    const contextRequest = await request.newContext();
    const payload = {
        "username": username!,
        "password": password!
    };

    const response = await contextRequest.post("https://demo.mifos.io/fineract-provider/api/v1/authentication", {
        data: payload
    });

    const responseBody = await response.json();

    expect(response.ok()).true;
    expect(response.status()).to.equal(200);

    return responseBody;
}

export async function saveStorageState(data: string, filePath: string) {
    const fullPath = path.resolve(filePath);

    if(!fs.existsSync(fullPath)) {
        const directory = filePath.split("/")[0];

        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data));
}

export function getStorageState() {
    if(!fs.existsSync(authFile)) {
        throw Error("Auth file does not exist");
    }

    let data = fs.readFileSync(authFile, "utf8");

    return data;
}

export async function setStorageState(page: Page) {
    const loginDetails = getStorageState();
    const jsonData = JSON.parse(loginDetails);
    const userPersmissionData = JSON.stringify(jsonData.permissions);
    const sessionData = JSON.stringify({
        "userId":jsonData.userId,
        "authenticationKey":jsonData.base64EncodedAuthenticationKey,
        "userPermissions":jsonData.permissions
    });
    
    await page.addInitScript((value) => {
        window.localStorage.setItem("mifosX.userData", value);
    }, loginDetails);
    await page.addInitScript((value) => {
        window.localStorage.setItem("mifosX.userPermissions", value);
    }, userPersmissionData);
    await page.addInitScript((value) => {
        window.localStorage.setItem("sessionData", value);
    }, sessionData);
}
