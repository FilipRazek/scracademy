import { chromium } from "playwright";
import {
  getLastPageNumber,
  getReposOnPage,
  REPOSITORIES_URL,
  scrapeReposFromPage,
} from "./githubPaginationHelpers.js";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto(REPOSITORIES_URL);
const lastPage = await getLastPageNumber(page);

const repos = await scrapeReposFromPage(page);
await page.close();

const pageNumbers = Array.from({ length: lastPage - 1 }, (_, i) => i + 2);
const reposFromPages = await Promise.all(
  pageNumbers.map(getReposOnPage(browser))
);
repos.push(...reposFromPages.flat());

console.log(repos.length, repos[0]);

await browser.close();
