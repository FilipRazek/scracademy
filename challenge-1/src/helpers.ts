import { CheerioAPI } from "cheerio";
import { KeyValueStore } from "crawlee";

export const extractDataFromProduct = ($: CheerioAPI) => {
  const title = $("h1#title").text().trim();
  const price = extractPrice($("span.a-price").text());
  const sellers = $('div[tabular-attribute-name="Sold by"]')
    // Filter out the cell name (every element with an even index)
    .filter((index) => index % 2 === 1)
    .map((_, el) => $(el).text().trim())
    .get();
  const features = $("div#feature-bullets li")
    .map((_, el) => $(el).text().trim())
    .get();
  return { title, price, features, sellers };
};

/**
 * Extract the price from a string containing one or many price tags.
 * Price format should be $XY(.ABC)
 */
export const extractPrice = (price: string) => {
  const regex = /\$\d+(\.\d+)?/;
  const match = price.match(regex);
  return match ? match[0] : undefined;
};

export const generateUniqueKeyFromUrl = (url: string) => {
  const regex = /\/dp\/([A-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
};

export const getKeyword = async () => {
  const keyword = (await KeyValueStore.getInput())["keyword"];
  if (!keyword) {
    throw new Error("No keyword provided");
  }
  return keyword;
};

export const getLogLevel = () => {
  const logLevel = parseInt(process.env.LOG_LEVEL, 10);
  if (isNaN(logLevel)) {
    throw new Error("LOG_LEVEL is not a number");
  }
  return logLevel;
};
