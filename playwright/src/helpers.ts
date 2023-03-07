import { Page } from "playwright";

export const evaluateFunctionOnPage = async <ReturnType>(
  page: Page,
  fn: () => ReturnType
) => {
  await page.exposeFunction(fn.name, fn);
  return page.evaluate(fn);
};

export const overrideAllButtonClicks = async (page: Page) => {
  await page.addInitScript(() => {
    // Override all buttons to log instead
    Node.prototype.addEventListener = () => {
      console.log("Button clicked");
    };
  });
};

export const handleGoogleCookiesClick = async (page: Page, accept = false) => {
  // Accept/Reject Google's cookies
  const buttonText = accept ? "Accept all" : "Reject all";
  await page.click(`button:has-text('${buttonText}')`);
};

export const messWithPage = async (page: Page) => {
  const randomString = Math.random().toString(36).slice(2);
  const color = "green";

  await page.evaluate(
    ({ newTitle, color }) => {
      document.body.style.backgroundColor = color;
      document.title = newTitle;
    },
    { newTitle: randomString, color }
  );
};

export const searchFirstGoogleResult = async (
  page: Page,
  searchTerm: string
) => {
  await page.type('input[title="Search"]', searchTerm);
  await page.keyboard.press("Enter");
  await page.click(".g a");
};

export const savePageData = async (page: Page) => {
  await page.waitForLoadState("load");
  // Log the page's title
  const title = await page.title();
  console.log(title);
  // Take a screenshot and save it
  await page.screenshot({ path: "output/screenshot.jpg" });
};
