import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const staticPaths = [
	"/",
	"/pricing",
	"/about",
	"/contact",
	"/features/firings",
	"/features/classes",
	"/features/wheel-time",
	"/solutions/community-studios",
	"/solutions/multi-location-studios",
	"/solutions/schools-and-nonprofits",
	"/blog",
	"/glossary",
];

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection("blog");
	const terms = await getCollection("glossary");
	const paths = [
		...staticPaths,
		...posts.map((p) => `/blog/${p.id}`),
		...terms.map((t) => `/glossary/${t.id}`),
	];
	const urls = paths
		.map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
