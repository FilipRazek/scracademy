import { Cheerio, Element, load } from "cheerio";
import { Browser, Page } from "playwright";

const BASE_URL = "https://github.com";
export const REPOSITORIES_URL = `${BASE_URL}/orgs/facebook/repositories`;

export const getLastPageNumber = async (page: Page) => {
  const lastPageElement = await page.waitForSelector(
    'a[aria-label^="Page "]:nth-last-child(2)'
  );

  const lastPageText = await lastPageElement.getAttribute("aria-label");

  return parseInt(lastPageText.replace(/\D/g, ""), 10);
};

const scrapeRepoData = ($repo: Cheerio<Element>) => {
  const titleElement = $repo.find('a[itemprop*="name"]');

  return {
    title: titleElement.text().trim(),
    description: $repo.find('p[itemprop*="description"]').text().trim(),
    link: new URL(titleElement.attr("href"), BASE_URL).href,
  };
};

export const scrapeReposFromPage = async (page: Page) => {
  const $ = load(await page.content());
  return [...$("li.Box-row")].map((repo) => scrapeRepoData($(repo)));
};

export const getReposOnPage =
  (browser: Browser) => async (pageNumber: number) => {
    const newPage = await browser.newPage();
    const url = new URL(REPOSITORIES_URL);
    url.searchParams.set("page", pageNumber.toString());
    await newPage.goto(url.href);
    const newRepos = await scrapeReposFromPage(newPage);
    await newPage.close();
    return newRepos;
  };
