import { After, Before } from "@cucumber/cucumber";
import { MifosWorld } from "./world";

Before(async function (this: MifosWorld) {
    await this.initialize();
});

After(async function (this: MifosWorld) {
    await this.cleanup();
});
