import { Dataset, Configuration } from "crawlee";
import { ApifyClient, DownloadItemsFormat } from "apify-client";
import { writeFileSync } from "fs";

import * as dotenv from "dotenv";
dotenv.config();

const apifyToken = process.env.APIFY_TOKEN;
if (!apifyToken) throw new Error("Missing API token");

Configuration.getGlobalConfig().set("purgeOnStart", false);

const dataset = await Dataset.open();
const { items } = await dataset.getData();

const apifyClient = new ApifyClient({
  token: apifyToken,
});

console.log("Creating a new dataset on the Apify platform");
const remoteDataset = await apifyClient.datasets().getOrCreate();
const datasetClient = apifyClient.dataset(remoteDataset.id);

console.log("Uploading dataset items to the newly created dataset");
await datasetClient.pushItems(items);

console.log("Downloading an Excel file and saving it to disk");
const xlsx = await datasetClient.downloadItems(DownloadItemsFormat.XLSX);
writeFileSync("dataset.xlsx", xlsx);
