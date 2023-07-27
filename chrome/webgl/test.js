import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { dirname, relative } from "node:path";
import { cwd, platform } from "node:process";

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
    ];
    options.addArguments(args);

    const service = new ServiceBuilder(
      `${cwd()}/node_modules/nw/nwjs/chromedriver${
        platform === "win32" ? ".exe" : ""
      }`,
    ).build();

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
