import { Dataset, Configuration } from "crawlee";

Configuration.getGlobalConfig().set("purgeOnStart", false);

const dataset = await Dataset.open();
const { items } = await dataset.getData();

let mostExpensive: { title?: string; price?: number };

const THRESHOLD = 50;
console.log(`All items over $${THRESHOLD}:`);

const extractPrice = (price: string) => Number(price.replace(/[^0-9\.]/g, ""));

for (const { price, title } of items) {
  const priceNumber = extractPrice(price);
  if (priceNumber > THRESHOLD) console.table({ title, price });
  if (!mostExpensive || priceNumber > mostExpensive.price)
    mostExpensive = { title, price };
}

console.log("Most expensive item:");
console.table(mostExpensive);
