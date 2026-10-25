import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

type Entry = { path: string; title: string; description: string };

const sections: { heading: string; entries: Entry[] }[] = [
	{
		heading: "Product",
		entries: [
			{
				path: "/",
				title: "Kilnbook",
				description:
					"Overview of Kilnbook: kiln firing queues, wheel time reservations, class packs and memberships in one place.",
			},
			{
				path: "/features/firings",
				title: "Kiln firing queues",
				description:
					"Track bisque and glaze loads, charge firing fees by cubic inch, and text members when their pieces are ready for pickup.",
			},
			{
				path: "/features/classes",
				title: "Classes and class packs",
				description:
					"Sell multi-week pottery courses, drop-in sessions and class packs with waitlists that fill cancelled seats automatically.",
			},
			{
				path: "/features/wheel-time",
				title: "Wheel and table booking",
				description:
					"Members reserve wheels, hand-building tables and the slab roller in one-hour blocks, with limits set per membership tier.",
			},
		],
	},
	{
		heading: "Pricing",
		entries: [
			{
				path: "/pricing",
				title: "Pricing",
				description:
					"Simple monthly pricing for pottery studios of every size. Starter, Studio and Collective plans, all with a 30-day free trial.",
			},
		],
	},
];

const companyEntries: Entry[] = [
	{
		path: "/about",
		title: "About Kilnbook",
		description:
			"Kilnbook was started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
	},
	{
		path: "/contact",
		title: "Book a demo",
		description:
			"Book a 20-minute Kilnbook demo or reach our support team. We reply within one business day.",
	},
];

const list = (entries: Entry[], site: URL | undefined) =>
	entries
		.map((e) => `- [${e.title}](${new URL(e.path, site).href}): ${e.description}`)
		.join("\n");

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const guides: Entry[] = [
		{
			path: "/blog",
			title: "Journal",
			description:
				"Notes on running a pottery studio: firing schedules, pricing classes, membership rules and what we are building at Kilnbook.",
		},
		...posts.map((p) => ({
			path: `/blog/${p.id}`,
			title: p.data.title,
			description: p.data.description,
		})),
	];

	const body = `# Kilnbook

> Kilnbook is booking and class-management software for pottery studios. It runs the parts of a studio that live on whiteboards and sticky notes: kiln firing queues and firing fees, wheel time reservations, classes, class packs and memberships, all in one place. Kilnbook was started in 2022 in Portland, Oregon, and every plan comes with a 30-day free trial.

${sections.map((s) => `## ${s.heading}\n\n${list(s.entries, site)}`).join("\n\n")}

## Guides

${list(guides, site)}

## Company

${list(companyEntries, site)}
`;
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
