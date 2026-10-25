import type { APIRoute } from "astro";
import { getSitePages, type PageKind, type SitePage } from "../site-map";

const sections: { heading: string; kinds: PageKind[] }[] = [
	{ heading: "Product", kinds: ["product"] },
	{ heading: "Pricing", kinds: ["pricing"] },
	{ heading: "Guides", kinds: ["guides", "guide"] },
	{ heading: "Company", kinds: ["company"] },
];

export const GET: APIRoute = async ({ site }) => {
	const pages = await getSitePages();
	const link = (page: SitePage) =>
		`- [${page.title}](${new URL(page.path, site).href}): ${page.description}`;

	const body = [
		"# Kilnbook",
		"",
		"> Kilnbook is booking and class-management software for pottery studios. It runs kiln firing queues (firing fees by cubic inch and pickup texts), wheel and table reservations, multi-week classes, drop-ins, class packs and memberships in one place. It started in a community studio in Portland, Oregon, and over 340 studios in the US, Canada and the UK use it. Every plan comes with a 30-day free trial.",
		"",
		...sections.flatMap(({ heading, kinds }) => {
			const matches = pages.filter((page) => kinds.includes(page.kind));
			return matches.length ? [`## ${heading}`, "", ...matches.map(link), ""] : [];
		}),
	].join("\n");

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
