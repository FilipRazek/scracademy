import { load } from "cheerio";
import extractPrice from "./extractPrice.js";
type CheerioApi = ReturnType<typeof load>;

export default ($: CheerioApi) => {
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
