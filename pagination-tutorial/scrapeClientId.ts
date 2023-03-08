import puppeteer from "puppeteer";

const scrapeClientId = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const clientIdPromise = new Promise<string>((resolve) =>
    page.on("response", async (res) => {
      const id = new URL(res.url()).searchParams.get("client_id") ?? null;
      if (id) return resolve(id);
    })
  );

  await page.goto("https://soundcloud.com/tiesto/tracks");
  await page.waitForSelector(".sc-classic");

  const clientId = await clientIdPromise;
  await browser.close();
  return clientId;
};

export default scrapeClientId;
