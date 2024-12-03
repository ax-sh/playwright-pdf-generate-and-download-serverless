// biome-ignore lint/style/useImportType: <explanation>
import { type Browser, type Page } from "playwright-core";

export function base64EncodedResponse(buffer: Buffer, fileName: string) {
	const response = {
		headers: {
			"Content-type": "application/pdf",
			"content-disposition": `attachment; filename=${fileName}`,
		},
		statusCode: 200,
		body: buffer.toString("base64"),
		isBase64Encoded: true,
	};
	return response;
}
export function pdfResponse(pdf: Buffer, fileName: string) {
	return base64EncodedResponse(pdf, fileName);
}

export async function preparePdf(page: Page) {
	await page.setViewportSize({ width: 1280, height: 720 });
	await page.evaluate(() => {
		document.body.style.paddingRight = "1cm"; // only for pdf wo maintain typography
		document.body.style.backgroundColor = "black";
	});
	const m = "0cm";

	const pdfBuffer = await page.pdf({
		format: "A4",
		// displayHeaderFooter:true,
		printBackground: true,
		margin: { top: m, right: m, bottom: m, left: m },
	}); // generate the PDF 🎉
	return pdfBuffer;
}
async function makeBrowser(type: "netlify" = "netlify") {
	const cloud = require("@sparticuz/chromium");
	const { chromium } = require("playwright-core");

	// export const cloud = require("chrome-aws-lambda"); // similar to @sparticuz/chromium

	const executablePath = await cloud.executablePath();

	const browser = await chromium.launch({
		headless: false,
		args: cloud.args,
		// executablePath // only try on deployed
	});
	return browser;
}

export async function downloadPDFResponse() {
	const browser = await makeBrowser("netlify");
	const page = await browser.newPage();
	const url = "https://ax-sh.github.io/";
	await page.goto(url, { waitUntil: "networkidle" }); // works for react api only with networkidle
	const pdfBuffer = await preparePdf(page);

	await page.close();
	await browser.close();
	return pdfResponse(pdfBuffer, "portfolio.pdf");
}

export async function openPage(
	callback: (page: Page) => Promise<void>,
	timeoutMs = 30000,
): Promise<void> {
	let browser: Browser | null = null;

	try {
		browser = await makeBrowser();
		if (!browser) throw new Error("Failed to initialize the browser");

		// Using a scoped function to ensure proper cleanup
		await executeWithPage(browser, callback, timeoutMs);
	} catch (error) {
		console.error("Error during page operation:", error);
		throw error;
	} finally {
		if (browser) await browser.close();
	}
}

async function executeWithPage(
	browser: Browser,
	callback: (page: Page) => Promise<void>,
	timeoutMs: number,
): Promise<void> {
	const page = await browser.newPage({ acceptDownloads: true });

	try {
		page.setDefaultTimeout(timeoutMs);
		await callback(page);
	} catch (error) {
		console.error("Error during page interaction:", error);
		throw error;
	} finally {
		await page.close();
	}
}
