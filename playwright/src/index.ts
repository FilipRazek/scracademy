import { chromium } from "playwright";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

const mainUser = "tiesto";
const stubUser = "mestomusic";

await page.route(new RegExp(`soundcloud.com/${mainUser}`), async (route) => {
  return route.continue({
    url: route.request().url().replace(mainUser, stubUser),
  });
});

const HOME_URL = `https://soundcloud.com/${mainUser}/following`;
await page.goto(HOME_URL);

await page.waitForTimeout(10000);
await browser.close();
