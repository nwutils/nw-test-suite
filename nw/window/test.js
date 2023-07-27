import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import { dirname, relative } from "node:path";
import { cwd, platform } from "node:process";

import { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const { Driver, ServiceBuilder, Options } = chrome;

describe("nw.Window tests", async () => {
  let driver = undefined;

  before(async () => {
    const options = new Options();
    const args = [
      `nwapp=${relative(
        cwd(),
        relative(cwd(), dirname(import.meta.url).slice(7))
      )}`,
      "headless=new",
    ];
    options.addArguments(args);

    const service = new ServiceBuilder(
      `${cwd()}/node_modules/nw/nwjs/chromedriver${
        platform === "win32" ? ".exe" : ""
      }`
    ).build();

    driver = Driver.createSession(options, service);
  });

  it("Window.height", async () => {
    const heightElement = await driver.findElement(By.id("nw-window-height"));
    const height = await heightElement.getText();
    equal(height, "100");
  });

  it("Window.width", async () => {
    const widthElement = await driver.findElement(By.id("nw-window-width"));
    const width = await widthElement.getText();
    equal(width, "100");
  });

  it("Window.id", async () => {
    const idElement = await driver.findElement(By.id("nw-window-id"));
    const id = await idElement.getText();
    equal(typeof id, "string");
  });

  it("Window.title", async () => {
    const titleElement = await driver.findElement(By.id("nw-window-title"));
    const title = await titleElement.getText();
    equal(title, "Window");
  });

  it("Window devtools-closed", async () => {
    const devtoolsElement = await driver.findElement(By.id("nw-window-on-devtools-closed"));
    const devtools = await devtoolsElement.getText();
    equal(devtools, "devtools-closed");
  });

  after(() => {
    driver.quit();
  });
});
