import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { cwd } from "node:process";

import { Capabilities, Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const { ServiceBuilder, setDefaultService } = chrome;

describe("NW Window API tests", async () => {
  let driver = null;

  before(async () => {
    const service = new ServiceBuilder(`${cwd()}/node_modules/nw/nwjs/chromedriver`).build();
    setDefaultService(service);
    driver = await new Builder()
      .withCapabilities(Capabilities.chrome())
      .build();
  });

  it("Set Window height", async () => {
    let heightElement = await driver.findElement(By.id("window-height"));
    let height = await heightElement.getText();
    equal(height, "100");
  });

  after(async () => {
    await driver.quit();
  });
});
