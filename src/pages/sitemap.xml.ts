import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { sitePages, pageUrl, lastCommitDate } from "../site-pages";

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection("blog");
	const entries = [
		...sitePages.map((p) => ({ path: p.path, file: p.file })),
		...posts.map((p) => ({ path: `/blog/${p.id}`, file: p.filePath })),
	];
	const urls = entries
		.map(({ path, file }) => {
			const lastmod = file ? lastCommitDate(file) : undefined;
			const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
			return `  <url><loc>${pageUrl(path, site)}</loc>${lastmodTag}</url>`;
		})
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
