import { load } from "cheerio";
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

const BASE_URL = "https://www.aboutyou.com/c/women/clothing-20204";
await page.goto(BASE_URL);

const productTileSelector = 'a[data-testid*="productTile"]';

const itemHeight = await page.$eval(
  productTileSelector,
  (tile) => tile.clientHeight
);
let totalScrolledDistance = 0;

const products = [];
const DESIRED_NUMBER_OF_PRODUCTS = 75;
while (products.length < DESIRED_NUMBER_OF_PRODUCTS) {
  const additionalScrollHeight = itemHeight * 3;
  await page.mouse.wheel(0, additionalScrollHeight);
  totalScrolledDistance += additionalScrollHeight;
  await page.waitForTimeout(1000);

  const $ = load(await page.content());
  const newTiles = [...$(productTileSelector)].slice(products.length);
  const newItems = newTiles.map((tile) => {
    const element = $(tile);
    return {
      brand: element.find('p[data-testid="brandName"]').text().trim(),
      price: element.find('span[data-testid="finalPrice"]').text().trim(),
    };
  });

  products.push(...newItems);

  const availableScroll = await page.evaluate(
    () => document.body.scrollHeight - window.innerHeight
  );
  // If we have scrolled to the bottom, break
  if (totalScrolledDistance >= availableScroll) {
    break;
  }
}

console.log(products.slice(0, DESIRED_NUMBER_OF_PRODUCTS));
await browser.close();
