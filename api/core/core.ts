export async function downloadPDF() {
	// const cloud = require("@sparticuz/chromium");
	// // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
	// const executablePath = await cloud.executablePath()
	const { chromium } = require("playwright-core");

	return { c: chromium };
}

export const cloud = require("chrome-aws-lambda");
export const desc = "Api for pdf generation";
