import { Dataset, Configuration } from "crawlee";

Configuration.getGlobalConfig().set("purgeOnStart", false);

const dataset = await Dataset.open();

const { items } = await dataset.getData();
console.log(items);
