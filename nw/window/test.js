import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { dirname, relative } from "node:path";
import { cwd } from "node:process";

import { Capabilities, Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const { Driver, ServiceBuilder, Options } = chrome;

describe("NW Window API tests", async () => {
  let driver = undefined;

  before(async () => {
    const options = new Options();
    options.addArguments([
      "nwapp=" +
        relative(cwd(), relative(cwd(), dirname(import.meta.url).slice(7))),
    ]);
    options.setPageLoadStrategy("normal");

    const service = new ServiceBuilder(
      `${cwd()}/node_modules/nw/nwjs/chromedriver`
    ).build();

    driver = Driver.createSession(options, service);
  });

  it("Set Window height", async () => {
    const heightElement = await driver.findElement(By.id("nw-window-height"));
    const height = await heightElement.getText();
    equal(height, "100");
  });

  after(() => {
    driver.quit();
  });
});
