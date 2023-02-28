/**
 * Extract the price from a string containing one or many price tags.
 * Price format should be $XY(.ABC)
 */
export default (price: string) => {
  const regex = /\$\d+(\.\d+)?/;
  const match = price.match(regex);
  return match ? match[0] : undefined;
};
