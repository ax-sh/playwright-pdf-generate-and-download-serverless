// Netlify On-demand Builder (runs on first request only)
// exports.handler = builder(handler);

import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
	const core = await import("./core");
	const data = await core.downloadPDFResponse();
	return data;
};
