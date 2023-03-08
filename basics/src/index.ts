import { load, Element } from "cheerio";
import { gotScraping } from "got-scraping";
import { parse } from "json2csv";
import { writeFileSync } from "fs";

const storeUrl =
  "https://warehouse-theme-metal.myshopify.com/collections/sales";

const { body: html } = await gotScraping(storeUrl);
const $ = load(html);
const products = $(".product-item");

const results = [];

const getPrice = (product: Element) => {
  const priceNode = $(product).find("span.price").contents()[2];
  if (priceNode.type !== "text") {
    return null;
  }
  return priceNode.data.trim();
};

for (const product of products) {
  const titleElement = $(product).find("a.product-item__title");
  const title = titleElement.text().trim();
  const price = getPrice(product);
  results.push({ title, price });
}

const csv = parse(results);
writeFileSync("results.csv", csv);
