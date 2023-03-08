import { load } from "cheerio";
import {
  extractDataFromProduct,
  extractPrice,
  generateUniqueKeyFromUrl,
} from "../helpers";
import productPageHtml from "./productPageHtml";

describe("extractDataFromProduct", () => {
  const $ = load(productPageHtml);
  const productData = extractDataFromProduct($);
  it("should return an object with the correct properties", () => {
    expect(typeof productData).toBe("object");
    expect(productData).toHaveProperty("title");
    expect(productData).toHaveProperty("price");
    expect(productData).toHaveProperty("features");
    expect(productData).toHaveProperty("sellers");
  });

  it("should return the correct properties", () => {
    expect(productData).toMatchObject({
      title: "Apple iPhone XR, 64GB, Black - Unlocked (Renewed)",
      price: "$239.99",
      sellers: ["Kiss Electronics Inc", "supplytronics", "SupremeDealsCR"],
      features: [
        "This phone is unlocked and compatible with any carrier of choice on GSM and CDMA networks (e.g. AT&T, T-Mobile, Sprint, Verizon, US Cellular, Cricket, Metro, Tracfone, Mint Mobile, etc.).",
        "Tested for battery health and guaranteed to have a minimum battery capacity of 80%.",
        "Successfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.",
        "The device does not come with headphones or a SIM card. It does include a generic (Mfi certified) charger and charging cable.",
        "Inspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arm's length.",
      ],
    });
  });
});

describe("extractPrice", () => {
  it("should return a string", () => {
    const priceTag = "$3.00";
    expect(typeof extractPrice(priceTag)).toBe("string");
  });

  it("should extract the price even when there is no decimal part", () => {
    const priceTag = "$3";
    expect(extractPrice(priceTag)).toEqual("$3");
  });

  it("should return undefined when there is no dollar sign", () => {
    const priceTag = "6.00";
    expect(extractPrice(priceTag)).toBeUndefined();
  });

  it("should extract the price from a long string", () => {
    const longPriceTag =
      "$214.86$214.86$193.86$193.86$21.00$21.00$214.86$214.86$189.86$189.86$25.00$25.00$193.86$193.86$234.99$234.99$326.95$326.95$219.97$219.97$164.99$164.99";
    expect(extractPrice(longPriceTag)).toEqual("$214.86");
  });

  it("should return undefined if no price is found", () => {
    const noPriceTag = "Only the product title here!";
    expect(extractPrice(noPriceTag)).toBeUndefined();
  });
});

describe("generateUniqueKeyFromUrl", () => {
  it("should extract the product id from an Amazon url", () => {
    const productUrl =
      "https://www.amazon.com/dp/B07984JN3L?plattr=ACOMFO&ie=UTF-8";
    const productId = generateUniqueKeyFromUrl(productUrl);
    expect(productId).toEqual("B07984JN3L");
  });

  it("should return undefined when the url is not for a product", () => {
    const notAProductUrl =
      "https://www.amazon.com/gp/browse.html?node=16218619011&ref_=footer_swp";
    const productId = generateUniqueKeyFromUrl(notAProductUrl);
    expect(productId).toBeUndefined();
  });
});
