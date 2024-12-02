import { expect, test } from "@playwright/test";

test.describe("Playwright Browser Testing", () => {
	test("should navigate to a page and check title", async ({ page }) => {
		await page.goto("https://example.com");
		const title = await page.title();
		expect(title).toBe("Example Domain");
	});

	test("should find an element and check its text", async ({ page }) => {
		await page.goto("https://example.com");
		const text = await page.locator("h1").innerText();
		expect(text).toBe("Example Domain");
	});

	test("should take a screenshot", async ({ page }) => {
		await page.goto("https://example.com");
		await page.screenshot({ path: "screenshot.png" });
		// Optionally check the file existence
		const fs = await import("node:fs/promises");
		const exists = await fs
			.access("screenshot.png")
			.then(() => true)
			.catch(() => false);
		expect(exists).toBe(true);
	});
	test.only("should download a pdf", async ({ page }) => {
		await page.goto("https://example.com");
		const pdfBuffer = await page.pdf({
			format: "A4",
			// displayHeaderFooter:true,
			printBackground: true,
			margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
		}); // generate the PDF 🎉
		const uint8Array = new Uint8Array(pdfBuffer);

		const fs = await import("node:fs/promises");
		await fs.writeFile("output.pdf", uint8Array, (err, b) => {
			if (err) {
				console.error("Error writing the file:", err);
			} else {
				expect("File has been saved!").toBe(true);
			}
		});
	});
});
