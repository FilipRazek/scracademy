import { CheerioCrawler, Dataset, ProxyConfiguration } from "crawlee";
import { readFile } from "fs/promises";

const proxyData = await readFile("freeProxies.json", "utf-8");
const proxyUrls = JSON.parse(proxyData);

const proxyConfiguration = new ProxyConfiguration({ proxyUrls });

const crawler = new CheerioCrawler({
  proxyConfiguration,
  requestHandler: async ({ $, request, enqueueLinks, proxyInfo }) => {
    console.log(proxyInfo);
    if (request.label === "START") {
      await enqueueLinks({
        selector: 'a[href*="/product/"]',
      });
      return;
    }

    const title = $("h3").text().trim();
    const price = $("h3 + div").text().trim();
    const description = $('div[class*="Text_body"]').text().trim();

    await Dataset.pushData({
      title,
      description,
      price,
    });
  },
});

await crawler.addRequests([
  {
    url: "https://demo-webstore.apify.org/search/on-sale",
    // By labeling the Request, we can very easily
    // identify it later in the requestHandler.
    label: "START",
  },
]);

await crawler.run();
