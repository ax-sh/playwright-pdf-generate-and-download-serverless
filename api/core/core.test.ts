import { describe, expect, it, test } from "bun:test";
const { chromium: playwright } = require("playwright-core");
const chromium = require("@sparticuz/chromium");

test("Check the page title of example.com", async (t) => {
	const executablePath: string = await chromium.executablePath();
	expect(executablePath).not.toBeEmpty();
	const browser = await playwright.launch({
		args: chromium.args,
		// headless: chromium.headless,
		// executablePath
	});

	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://example.com");
	const pageTitle = await page.title();
	await browser.close();

	expect(pageTitle).toBe("Example Domain");
});

describe("PDF", () => {
	it("should open browser", async () => {
		const cloud = require("chrome-aws-lambda");
		const executablePath = await cloud.executablePath;
		expect(executablePath).toEqual(null);
	});
});
