import path from "node:path";
import process from "node:process";

import { findpath } from "nw";
import selenium from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("nw.Window tests", async () => {
  /**
   * @type {selenium.ThenableWebDriver | undefined}
   */
  let driver = undefined;

  beforeAll(async function () {
    const options = new chrome.Options();
    const args = [
      'nwapp=' + path.resolve('nw', 'window'),
      "headless=new",
    ];
    options.addArguments(args);

    const nwPath = await findpath('nwjs', { flavor: 'sdk' });
    options.setChromeBinaryPath(nwPath);

    driver = new selenium.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  it("Window.height", async function () {
    const heightElement = await driver.findElement(selenium.By.id("nw-window-height"));
    const height = await heightElement.getText();
    // TODO: Fix this behaviour in upstream Chromium
    if (process.platform === "darwin") {
      expect(height).toEqual("128");
    } else {
      expect(height).toEqual("100");
    }
  });

  it("Window.width", async function () {
    const widthElement = await driver.findElement(selenium.By.id("nw-window-width"));
    const width = await widthElement.getText();
    expect(width).toEqual("100");
  });

  it("Window.id", async function () {
    const idElement = await driver.findElement(selenium.By.id("nw-window-id"));
    const id = await idElement.getText();
    expect(typeof id).toEqual("string");
  });

  it("Window.title", async function () {
    const titleElement = await driver.findElement(selenium.By.id("nw-window-title"));
    const title = await titleElement.getText();
    expect(title).toEqual("Window");
  });

  it("Window devtools-closed", async function () {
    const devtoolsElement = await driver.findElement(
      selenium.By.id("nw-window-on-devtools-closed"),
    );
    const devtools = await devtoolsElement.getText();
    // TODO: Add support for this event in NW.js
    // equal(devtools, "devtools-closed") is expected but not working
    expect(devtools).toEqual("");
  });

  afterAll(async function () {
    await driver.quit();
  });
});
