import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { sitePages, pageUrl, type PageKind } from "../site-pages";

const sections: { heading: string; kind: PageKind }[] = [
	{ heading: "Product", kind: "product" },
	{ heading: "Pricing", kind: "pricing" },
	{ heading: "Guides", kind: "guides" },
	{ heading: "Company", kind: "company" },
];

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const link = (title: string, path: string, summary: string) =>
		`- [${title}](${pageUrl(path, site)}): ${summary}`;

	const blocks = sections.map(({ heading, kind }) => {
		const lines = sitePages
			.filter((p) => p.kind === kind)
			.map((p) => link(p.title, p.path, p.summary));
		if (kind === "guides") {
			lines.push(...posts.map((p) => link(p.data.title, `/blog/${p.id}`, p.data.description)));
		}
		return `## ${heading}\n\n${lines.join("\n")}`;
	});

	const body = `# Kilnbook

> Kilnbook is booking and class-management software for pottery studios: kiln firing queues, wheel time reservations, class packs and memberships in one place. It was started in 2022 in a community studio in Portland, Oregon, and more than 340 studios in the US, Canada and the UK run their bookings, firings and memberships on it. Every plan comes with a 30-day free trial.

${blocks.join("\n\n")}
`;
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
