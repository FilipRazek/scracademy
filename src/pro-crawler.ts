import { PlaywrightCrawler, Dataset } from "crawlee";
import { load } from "cheerio";

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, request, enqueueLinks }) => {
    const $ = load(await page.content());

    if (request.label === "START") {
      await enqueueLinks({
        selector: 'a[href*="/product/"]',
        baseUrl: new URL(request.url).origin,
      });
      return;
    }

    const title = $("h3").text().trim();
    const price = $("h3 + div").text().trim();
    const description = $('div[class*="Text_body"]').text().trim();

    const imageRelative = $('img[alt="Product Image"]').attr("src");
    const base = new URL(request.url).origin;
    const image = new URL(imageRelative, base).href;

    await Dataset.pushData({ title, description, price, image });
  },
});

const url = "https://demo-webstore.apify.org/search/on-sale";
await crawler.addRequests([{ url, userData: { label: "START" } }]);
await crawler.run();
