import { load } from "cheerio";
import { createPlaywrightRouter, Dataset, Request } from "crawlee";
import { extractDataFromProduct, generateUniqueKeyFromUrl } from "./helpers.js";

export enum RouteLabels {
  SEARCH_RESULTS = "search-results",
  PRODUCT_DETAILS = "product-details",
}

const router = createPlaywrightRouter();
router.addHandler(
  RouteLabels.PRODUCT_DETAILS,
  async ({ request, log, page }) => {
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
  }
);

router.addHandler(
  RouteLabels.SEARCH_RESULTS,
  async ({ request, enqueueLinks, log }) => {
    // Visiting the search results page
    log.info(`Visiting ${request.url}`);

    const transformRequestFunction = (request: Request) => {
      // Add a unique key based on the URL to the request
      const uniqueKey = generateUniqueKeyFromUrl(request.url);
      if (uniqueKey) {
        return { ...request, uniqueKey };
      }
      return request;
    };

    // We want to enqueue all the links to the product details pages
    await enqueueLinks({
      selector: 'div[data-component-type="s-search-result"] a[href*="/dp/"]',
      regexps: [/\/dp\/[A-Z0-9]+/],
      transformRequestFunction,
      label: RouteLabels.PRODUCT_DETAILS,
      baseUrl: request.url,
      userData: { keyword: request.userData.keyword },
    });
  }
);

export default router;
