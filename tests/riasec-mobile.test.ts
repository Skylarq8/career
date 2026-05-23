import { chromium } from "playwright";
import { describe, expect, it } from "vitest";

const baseUrl = process.env.VERIFY_BASE_URL;

describe.skipIf(!baseUrl)("RIASEC mobile responsiveness", () => {
  it("keeps the RIASEC test flow inside a 390px viewport", async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: {
        height: 1100,
        width: 390,
      },
    });

    await page.goto(`${baseUrl}/tests/riasec`, { waitUntil: "networkidle" });

    const state = await page.evaluate(() => ({
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      nextButtons: document.querySelectorAll("button").length,
    }));

    await browser.close();

    expect(state.horizontalOverflow).toBe(false);
    expect(state.nextButtons).toBeGreaterThan(0);
  });
});
