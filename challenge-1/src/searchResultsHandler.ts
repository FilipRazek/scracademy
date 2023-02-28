import { Request } from "crawlee";
import generateUniqueKeyFromUrl from "./generateUniqueKeyFromUrl.js";
import { RouteLabels } from "./router.js";

export default async ({ request, enqueueLinks, log }) => {
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
};
