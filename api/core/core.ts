// import * as buffer from "node:buffer";
//
// export const cloud = require("chrome-aws-lambda");
//
// export function base64EncodedResponse(base64Encoded: ArrayBuffer, fileName) {
// 	const response = {
// 		headers: {
// 			"Content-type": "application/pdf",
// 			"content-disposition": `attachment; filename=${fileName}.pdf`,
// 		},
// 		statusCode: 200,
// 		body: buffer.toString("base64"),
// 		isBase64Encoded: true,
// 	};
// 	return response
// }
// export function pdfResponse(pdf: Buffer, fileName: string) {
// 	return base64EncodedResponse(pdf, fileName);
// }

export async function downloadPDF() {
	const cloud = require("@sparticuz/chromium");
	const executablePath = await cloud.executablePath();
	const { chromium } = require("playwright-core");
	const browser = await chromium.launch({ headless: false });
	const page = await browser.newPage();
	let url: string;
	url = "https://ax-sh.github.io/";
	await page.goto(url);
	// await page.close()
	// await browser.close()
	return { args: cloud.args, executablePath };

	//
	// console.log(	chromium.args)
	//
	// return pdfResponse(null, "portfolio.pdf");
}
