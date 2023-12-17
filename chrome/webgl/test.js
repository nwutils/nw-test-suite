import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { dirname, relative } from "node:path";
import { cwd } from "node:process";

import { findpath } from "nw";
import { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const { Driver, ServiceBuilder, Options } = chrome;

describe("chrome WebGL tests", async () => {
  let driver = undefined;

  before(async () => {
    const options = new Options();
    const args = [
      `nwapp=${relative(
        cwd(),
        relative(cwd(), dirname(import.meta.url).slice(7)),
      )}`,
      "headless=new",
      "sandbox=false",
    ];
    options.addArguments(args);

    const service = new ServiceBuilder(findpath("chromedriver")).build();

    driver = Driver.createSession(options, service);
  });

  it("WebGL2 support", async () => {
    const chromeWebGL = await driver.findElement(By.id("chrome-webgl"));
    const status = await chromeWebGL.getText();
    equal(status, "WebGL2 is supported.");
  });

  after(() => {
    driver.quit();
  });
});
