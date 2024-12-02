export async function downloadPDF() {
	// const cloud = require("@sparticuz/chromium");
	// // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
	// const executablePath = await cloud.executablePath()
	const { chromium } = require("playwright-core");

	return { c: chromium };
}

export const cloud = require("chrome-aws-lambda");

export function pdfResponse(pdf: Buffer, fileName: string) {
	const response = {
		headers: {
			"Content-type": "application/pdf",
			"content-disposition": `attachment; filename=${fileName}.pdf`,
		},
		statusCode: 200,
		body: pdf.toString("base64"),
		isBase64Encoded: true,
	};
}
