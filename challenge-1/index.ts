/**
 * We're scraping amazon:
 * Input looks like this: {"keyword": "iphone"}
 * 1) Scrape the search page (only the first one)
 * 2) Get relevant information for each product
 * 3) Push the results into a Dataset
 */

import dotenv from "dotenv";
import runCrawler from "./src/runCrawler.js";
dotenv.config();

await runCrawler();
