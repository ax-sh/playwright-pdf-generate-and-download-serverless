import * as buffer from "node:buffer";

export const cloud = require("chrome-aws-lambda");

export function base64EncodedResponse(base64Encoded: Buffer, fileName) {
	const response = {
		headers: {
			"Content-type": "application/pdf",
			"content-disposition": `attachment; filename=${fileName}.pdf`,
		},
		statusCode: 200,
		body: buffer.toString("base64"),
		isBase64Encoded: true,
	};
}
export function pdfResponse(pdf: Buffer, fileName: string) {
	return base64EncodedResponse();
}

export async function downloadPDF() {
	// const cloud = require("@sparticuz/chromium");
	// // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
	// const executablePath = await cloud.executablePath()
	// const { chromium } = require("playwright-core");

	return pdfResponse(null, "portfolio.pdf");
}
