import { Page, Browser, Cookie } from "playwright";
import { randomArrayChoice } from "./helpers.js";

type Email = {
  to: string;
  subject: string;
  body: string;
};

export const YAHOO_URL = "https://www.yahoo.com/";

export const getEmailsToSend = (): Email[] => {
  const fakeEmailAddresses = [
    "burton.elyas@foundtoo.com",
    "moficok539@gpipes.com",
  ];

  const emailData = [
    {
      subject: "Hello",
      body: "This is a message.",
    },
    {
      subject: "Testing",
      body: "I love the academy!",
    },
    {
      subject: "Apify is awesome!",
      body: "Some content.",
    },
  ];

  return emailData.map((emailData) => ({
    ...emailData,
    to: randomArrayChoice(fakeEmailAddresses),
  }));
};

export const signInToYahoo = async (
  browser: Browser,
  username: string,
  password: string
) => {
  const page = await browser.newPage();
  await page.goto(YAHOO_URL);
  await page.click('button[name="agree"]');
  await page.waitForSelector('a:has-text("Sign in")');

  await page.click('a:has-text("Sign in")');
  await page.waitForLoadState("load");

  await page.type('input[name="username"]', username);
  await page.click('input[name="signin"]');

  await page.type('input[name="password"]', password);
  await page.click('button[name="verifyPassword"]');
  await page.waitForLoadState("domcontentloaded");

  const cookies = await page.context().cookies();
  await page.close();
  return cookies;
};

export const sendEmail = async (page: Page, { to, subject, body }: Email) => {
  await page.goto("https://mail.yahoo.com/");
  await page.click('a[data-test-id="compose-button"]');

  await page.waitForLoadState("load");

  await page.type("input#message-to-field", to);
  await page.type('input[data-test-id="compose-subject"]', subject);
  await page.type('div#editor-container div[contenteditable="true"]', body);

  await page.click('button[data-test-id="compose-send-button"]');
};

export const sendEmails = async (
  browser: Browser,
  cookies: Cookie[],
  emails: Email[]
) => {
  const emailPromises = emails.map(async (email) => {
    const temporaryContext = await browser.newContext();
    await temporaryContext.addCookies(cookies);
    const page = await temporaryContext.newPage();
    await sendEmail(page, email);
    await temporaryContext.close();
  });
  return Promise.all(emailPromises);
};
