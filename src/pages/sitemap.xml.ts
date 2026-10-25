import type { APIRoute } from "astro";
import { getSitePages, lastModified } from "../site-map";

export const GET: APIRoute = async ({ site }) => {
	const pages = await getSitePages();
	const urls = pages
		.map((page) => {
			const loc = `<loc>${new URL(page.path, site).href}</loc>`;
			const date = lastModified(page);
			const lastmod = date ? `<lastmod>${date.toISOString()}</lastmod>` : "";
			return `  <url>${loc}${lastmod}</url>`;
		})
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
