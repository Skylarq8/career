import { chromium } from "playwright";

const baseUrl = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3001";
const browser = await chromium.launch({ headless: true });

async function inspect(viewport, screenshotPath) {
  const page = await browser.newPage({ viewport });
  const browserErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ fullPage: true, path: screenshotPath });

  const pageState = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const overlay = document.querySelector(
      "[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay",
    );

    if (!canvas) {
      return {
        canvas: null,
        contentLength: document.body.innerText.trim().length,
        overlay: Boolean(overlay),
      };
    }

    const sample = document.createElement("canvas");
    const width = Math.max(1, Math.min(220, canvas.width));
    const height = Math.max(1, Math.min(220, canvas.height));
    sample.width = width;
    sample.height = height;
    const context = sample.getContext("2d", { willReadFrequently: true });

    context?.drawImage(canvas, 0, 0, width, height);
    const pixels = context?.getImageData(0, 0, width, height).data ?? [];
    let visiblePixels = 0;
    let colorfulPixels = 0;

    for (let index = 0; index < pixels.length; index += 4) {
      const [red, green, blue, alpha] = pixels.slice(index, index + 4);

      if (alpha > 0) {
        visiblePixels += 1;
      }

      if (alpha > 0 && Math.max(red, green, blue) - Math.min(red, green, blue) > 12) {
        colorfulPixels += 1;
      }
    }

    return {
      canvas: {
        colorfulPixels,
        height: canvas.height,
        visiblePixels,
        width: canvas.width,
      },
      contentLength: document.body.innerText.trim().length,
      overlay: Boolean(overlay),
    };
  });

  await page.goto(`${baseUrl}/booking`, { waitUntil: "networkidle" });
  const bookingHeading = await page.getByRole("heading", {
    name: "Зөвлөгөөний хүсэлтээ илгээх",
  }).count();

  await page.goto(`${baseUrl}/tests`, { waitUntil: "networkidle" });
  const testButtons = await page.getByRole("button").count();

  await page.goto(`${baseUrl}/admin/login`, { waitUntil: "networkidle" });
  const adminHeading = await page.getByRole("heading", {
    name: "Admin нэвтрэх",
  }).count();

  await page.goto(`${baseUrl}/tests/riasec`, { waitUntil: "networkidle" });
  const riasecState = await page.evaluate(() => ({
    flowButtons: document.querySelectorAll("button").length,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    pageText: document.body.innerText.includes("RIASEC"),
  }));

  await page.close();

  return {
    adminHeading,
    bookingHeading,
    browserErrors,
    pageState,
    riasecState,
    testButtons,
    viewport,
  };
}

const results = [
  await inspect({ height: 1100, width: 1440 }, "/private/tmp/minii-chiglel-desktop.png"),
  await inspect({ height: 1100, width: 390 }, "/private/tmp/minii-chiglel-mobile.png"),
];

console.log(JSON.stringify(results, null, 2));

await browser.close();
