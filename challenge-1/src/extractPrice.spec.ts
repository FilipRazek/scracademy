import extractPrice from "./extractPrice";

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
