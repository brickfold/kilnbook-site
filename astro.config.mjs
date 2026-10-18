// @ts-check
import { defineConfig, envField } from "astro/config";

export default defineConfig({
	site: "https://kilnbook.co",
	output: "static",
	trailingSlash: "never",
	build: {
		format: "directory",
	},
	env: {
		schema: {
			// Base URL of the booking service. Required: the demo form and the
			// studio finder link are rendered from it. See README.md.
			PUBLIC_BOOKING_API_URL: envField.string({
				context: "client",
				access: "public",
				url: true,
			}),
		},
		validateSecrets: true,
	},
});
