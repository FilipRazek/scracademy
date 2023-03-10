import axios from "axios";
import {
  ResponseData,
  Product,
  SortOrder,
  UserInput,
  ProductWithoutImage,
} from "./types.js";

const fetchData = async () => {
  const DUMMY_URL = "https://dummyjson.com/products?limit=100";
  const { data } = await axios.get<ResponseData>(DUMMY_URL);
  return data;
};

const sortData = (products: Product[], sortOrder: SortOrder) => {
  const copiedProducts = [...products];
  switch (sortOrder) {
    case SortOrder.ASC:
      return copiedProducts.sort((a, b) => a.price - b.price);
    case SortOrder.DESC:
      return copiedProducts.sort((a, b) => b.price - a.price);
    default:
      return copiedProducts;
  }
};

async function scrape(params: UserInput<true>): Promise<ProductWithoutImage[]>;
async function scrape(params: UserInput<false>): Promise<Product[]>;
async function scrape(
  input: UserInput
): Promise<(Product | ProductWithoutImage)[]> {
  const { products } = await fetchData();
  const sortedData = sortData(products, input.sort);

  if (input.removeImages) {
    return sortedData.map(({ images, ...rest }) => rest);
  }
  return sortedData;
}

const main = async () => {
  const INPUT: UserInput<true> = { sort: SortOrder.ASC, removeImages: true };
  const result = await scrape(INPUT);
  console.log(result);
};

main();
