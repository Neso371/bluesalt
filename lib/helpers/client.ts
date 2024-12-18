import { expect } from "chai";
import { Page, request } from "playwright";
import { getStorageState } from "./auth";

export async function createClient(officeId: number = 1, firstName: string, lastName: string, active: boolean = false) {
    const contextRequest = await request.newContext();
    const payload = {
        address:[{
            addressTypeId:53,
            addressLine1:"Test Add",
            isActive:true
        }],
        familyMembers:[],
        officeId:officeId,
        firstname:firstName,
        lastname:lastName,
        locale:"en",
        active:active,
        dateFormat:"dd MMMM yyyy",
        activationDate:"18 December 2024",
        submittedOnDate:"18 December 2024",
        savingsProductId:null
    };

    const loginDetails = getStorageState();
    const jsonData = JSON.parse(loginDetails);

    const response = await contextRequest.post("https://demo.mifos.io/fineract-provider/api/v1/clients", {
        headers: {
            Authorization: `Basic ${jsonData.base64EncodedAuthenticationKey}`
        },
        data: payload
    });

    const responseBody = await response.json();

    expect(response.ok()).true;
    expect(response.status()).to.equal(200);

    return responseBody;
}
