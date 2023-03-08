import { PlaywrightCrawler, log } from "crawlee";
import { getKeyword, getLogLevel } from "./helpers.js";
import router, { RouteLabels } from "./routes.js";
import dotenv from "dotenv";
dotenv.config();

log.setLevel(getLogLevel());
const keyword = await getKeyword();

log.info(`Starting crawler for keyword ${keyword}...`);

const crawler = new PlaywrightCrawler({ requestHandler: router });

const baseUrl = `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`;
const urls = [
  { url: baseUrl, label: RouteLabels.SEARCH_RESULTS, userData: { keyword } },
];
await crawler.run(urls);
