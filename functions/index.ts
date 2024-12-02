import { type Handler, builder } from "@netlify/functions";
import { cloud } from "../core";
export async function handler() {
	return {
		statusCode: 200,
		body: JSON.stringify({ message: cloud.executablePath }),
	};
}
// Netlify On-demand Builder (runs on first request only)
exports.handler = builder(handler);
