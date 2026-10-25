import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { execFileSync } from "node:child_process";

const staticPages: { path: string; file: string }[] = [
	{ path: "/", file: "src/pages/index.astro" },
	{ path: "/pricing", file: "src/pages/pricing.astro" },
	{ path: "/about", file: "src/pages/about.astro" },
	{ path: "/contact", file: "src/pages/contact.astro" },
	{ path: "/features/firings", file: "src/pages/features/firings.astro" },
	{ path: "/features/classes", file: "src/pages/features/classes.astro" },
	{ path: "/features/wheel-time", file: "src/pages/features/wheel-time.astro" },
	{ path: "/blog", file: "src/pages/blog/index.astro" },
];

// Date of the last commit that touched the file, or undefined if git history is unavailable.
function lastCommitDate(file: string): string | undefined {
	try {
		const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"],
		}).trim();
		return out || undefined;
	} catch {
		return undefined;
	}
}

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection("blog");
	const entries = [
		...staticPages.map(({ path, file }) => ({ path, lastmod: lastCommitDate(file) })),
		...posts.map((p) => ({
			path: `/blog/${p.id}`,
			lastmod:
				(p.filePath && lastCommitDate(p.filePath)) ?? p.data.pubDate.toISOString(),
		})),
	];
	const urls = entries
		.map(({ path, lastmod }) => {
			const loc = `<loc>${new URL(path, site).href}</loc>`;
			return lastmod
				? `  <url>${loc}<lastmod>${lastmod}</lastmod></url>`
				: `  <url>${loc}</url>`;
		})
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
