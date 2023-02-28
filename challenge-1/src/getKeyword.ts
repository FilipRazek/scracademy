import { KeyValueStore } from "crawlee";

export default async () => {
  const keyword = (await KeyValueStore.getInput())["keyword"];
  if (!keyword) {
    throw new Error("No keyword provided");
  }
  return keyword;
};
