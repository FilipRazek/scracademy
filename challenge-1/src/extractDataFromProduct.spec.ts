import { load } from "cheerio";
import extractDataFromProduct from "./extractDataFromProduct";
import productPageHtml from "./static/productPageHtml";

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
