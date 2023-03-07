import { chromium } from "playwright";
import dotenv from "dotenv";
import { getEmailsToSend, sendEmails, signInToYahoo } from "./yahooHelpers.js";
dotenv.config();

const USERNAME = process.env.YAHOO_USERNAME;
const PASSWORD = process.env.YAHOO_PASSWORD;

const browser = await chromium.launch({ headless: false });
const cookies = await signInToYahoo(browser, USERNAME, PASSWORD);

await sendEmails(browser, cookies, getEmailsToSend());

await browser.close();
