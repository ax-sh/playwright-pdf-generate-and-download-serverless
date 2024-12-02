import { describe, expect, it, test } from "bun:test";
const { chromium: playwright } = require("playwright-core");

test("Check the page title of example.com", async (t) => {
	const browser = await playwright.launch({
		// args: chromium.args,
		// executablePath: await chromium.executablePath(),
		// headless: chromium.headless,
	});

	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://example.com");
	const pageTitle = await page.title();
	await browser.close();

	expect(pageTitle).toBe("Example Domain");
});
