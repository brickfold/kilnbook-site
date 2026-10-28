import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { staticPages, type PageKind, type SitePage } from "../data/pages";

const sections: { kind: PageKind; heading: string }[] = [
	{ kind: "product", heading: "Product" },
	{ kind: "pricing", heading: "Pricing" },
	{ kind: "guides", heading: "Guides" },
	{ kind: "company", heading: "Company" },
];

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const pages: SitePage[] = [
		...staticPages,
		...posts.map((p) => ({
			path: `/blog/${p.id}`,
			kind: "guides" as const,
			title: p.data.title,
			summary: p.data.description,
		})),
	];

	const link = (page: SitePage) =>
		`- [${page.title}](${new URL(page.path, site).href}): ${page.summary}`;

	const body = [
		"# Kilnbook",
		"",
		"> Kilnbook is booking and class-management software for pottery studios. It runs kiln firing queues (with firing fees charged by cubic inch and pickup texts), wheel and hand-building table reservations with per-membership limits, multi-week courses, drop-in sessions, class packs with waitlists, and memberships. It started in a 14-wheel community studio in Portland, Oregon, and is used by over 340 studios in the US, Canada and the UK.",
		"",
		...sections.flatMap(({ kind, heading }) => {
			const items = pages.filter((p) => p.kind === kind);
			return items.length ? [`## ${heading}`, "", ...items.map(link), ""] : [];
		}),
	].join("\n");

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
