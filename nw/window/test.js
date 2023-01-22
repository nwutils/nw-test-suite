import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { dirname, relative } from "node:path";
import { cwd } from "node:process";

import { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const { Driver, ServiceBuilder, Options } = chrome;

describe("NW Window API tests", async () => {
  let driver = undefined;

  before(async () => {
    const options = new Options();
    options.addArguments(
      `nwapp=${relative(
        cwd(),
        relative(cwd(), dirname(import.meta.url).slice(7))
      )}`
    );

    const service = new ServiceBuilder(
      `${cwd()}/node_modules/nw/nwjs/chromedriver`
    ).build();

    driver = Driver.createSession(options, service);
  });

  it("get window height", async () => {
    const heightElement = await driver.findElement(By.id("nw-window-height"));
    const height = await heightElement.getText();
    equal(height, "100");
  });

  it("get window width", async () => {
    const widthElement = await driver.findElement(By.id("nw-window-width"));
    const width = await widthElement.getText();
    equal(width, "100");
  });

  it("get window id", async () => {
    const idElement = await driver.findElement(By.id("nw-window-id"));
    const id = await idElement.getText();
    equal(typeof id, "string");
  });

  after(() => {
    driver.quit();
  });
});