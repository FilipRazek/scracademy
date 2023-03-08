import { gotScraping } from "got-scraping";
import scrapeClientId from "./scrapeClientId.js";

const scrape100Items = async () => {
  let nextHref =
    "https://api-v2.soundcloud.com/users/141707/tracks?limit=20&offset=0";
  let items = [];

  const clientId = await scrapeClientId();

  while (items.length < 100) {
    if (!nextHref) return items;

    const nextURL = new URL(nextHref);
    nextURL.searchParams.set("client_id", clientId);

    const res = await gotScraping(nextURL);
    const json = JSON.parse(res.body);
    items.push(...json.collection);
    nextHref = json.next_href;
  }

  return items;
};

const data = await scrape100Items();

console.log(data.length);
