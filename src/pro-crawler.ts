import { CheerioCrawler, Dataset } from "crawlee";

const crawler = new CheerioCrawler({
  requestHandler: async ({ $, request, enqueueLinks }) => {
    if (request.label === "START") {
      await enqueueLinks({
        selector: 'a[href*="/product/"]',
        baseUrl: new URL(request.url).origin,
      });
    }

    const title = $("h3").text().trim();
    const price = $("h3 + div").text().trim();
    const description = $('div[class*="Text_body"]').text().trim();

    await Dataset.pushData({ title, description, price });
  },
});

const url = "https://demo-webstore.apify.org/search/on-sale";
await crawler.addRequests([{ url, userData: { label: "START" } }]);
await crawler.run();
