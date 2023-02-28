import { load } from "cheerio";
import { Dataset } from "crawlee";
import extractDataFromProduct from "./extractDataFromProduct.js";

export default async ({ request, log, page }) => {
  log.info(`Visiting product page ${request.uniqueKey}`);

  const $ = load(await page.content());
  const {
    title,
    price: offer,
    features: description,
    sellers,
  } = extractDataFromProduct($);
  await Dataset.pushData({
    title,
    offer,
    itemUrl: request.url,
    asin: request.uniqueKey,
    keyword: request.userData.keyword,
    sellers,
    description,
  });
};
