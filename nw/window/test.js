import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { dirname, relative } from "node:path";
import { cwd } from "node:process";

import { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const { Driver, ServiceBuilder, Options } = chrome;

describe("nw window tests", async () => {
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

  it("window height", async () => {
    const heightElement = await driver.findElement(By.id("nw-window-height"));
    const height = await heightElement.getText();
    equal(height, "100");
  });

  it("window width", async () => {
    const widthElement = await driver.findElement(By.id("nw-window-width"));
    const width = await widthElement.getText();
    equal(width, "100");
  });

  it("window id", async () => {
    const idElement = await driver.findElement(By.id("nw-window-id"));
    const id = await idElement.getText();
    equal(typeof id, "string");
  });

  it("window title", async () => {
    const titleElement = await driver.findElement(By.id("nw-window-title"));
    const title = await titleElement.getText();
    equal(title, "Window");
  });

  it("window x", async () => {
    const xElement = await driver.findElement(By.id("nw-window-x"));
    const x = await xElement.getText();
    equal(x, "100");
  });

  it("window y", async () => {
    const yElement = await driver.findElement(By.id("nw-window-y"));
    const y = await yElement.getText();
    equal(y, "100");
  });

  after(() => {
    driver.quit();
  });
});
