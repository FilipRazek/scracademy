import { createPlaywrightRouter } from "crawlee";
import productDetailsHandler from "./productDetailsHandler.js";
import searchResultsHandler from "./searchResultsHandler.js";

export enum RouteLabels {
  SEARCH_RESULTS = "search-results",
  PRODUCT_DETAILS = "product-details",
}

const router = createPlaywrightRouter();
router.addHandler(RouteLabels.PRODUCT_DETAILS, productDetailsHandler);
router.addHandler(RouteLabels.SEARCH_RESULTS, searchResultsHandler);
export default router;
