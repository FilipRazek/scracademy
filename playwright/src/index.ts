import { chromium } from "playwright";

const BASE_URL = "https://github.com";
const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);
console.log(REPOSITORIES_URL);

const lastPageElement = await page.waitForSelector(
  'a[aria-label^="Page "]:nth-last-child(2)'
);

const lastPage = parseInt(
  (await lastPageElement.getAttribute("aria-label")).replace(/\D/g, ""),
  10
);

const pages = Array.from({ length: lastPage - 1 }, (_, i) => i + 2);
console.log(pages);

await browser.close();
