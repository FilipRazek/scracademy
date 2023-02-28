import generateUniqueKeyFromUrl from "./generateUniqueKeyFromUrl";

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
