import type { Page } from "playwright-core";

export function base64EncodedResponse(buffer: Uint8Array, fileName: string) {
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
export function pdfResponse(pdf: Uint8Array, fileName: string) {
	return base64EncodedResponse(pdf, fileName);
}

async function preparePdf(page: Page) {
	await page.evaluate(() => {
		document.body.style.padding = "1cm";
		document.body.style.backgroundColor = "black";
	});
	const m = "0cm";

	const pdfBuffer: Uint8Array = await page.pdf({
		format: "A4",
		// displayHeaderFooter:true,
		printBackground: true,
		margin: { top: m, right: m, bottom: m, left: m },
	}); // generate the PDF 🎉
	return pdfBuffer;
}

export async function downloadPDF() {
	const cloud = require("@sparticuz/chromium");
	const { chromium } = require("playwright-core");

	// export const cloud = require("chrome-aws-lambda"); // similar to @sparticuz/chromium

	const executablePath = await cloud.executablePath();

	const browser = await chromium.launch({
		headless: false,
		args: cloud.args,
		// executablePath //only try on deployed
	});
	const page = await browser.newPage();
	let url: string;
	url = "https://ax-sh.github.io/";
	await page.goto(url, { waitUntil: "networkidle" }); // works for react api only with networkidle
	const pdfBuffer = await preparePdf(page);

	await page.close();
	await browser.close();
	return pdfResponse(pdfBuffer, "portfolio.pdf");
}
