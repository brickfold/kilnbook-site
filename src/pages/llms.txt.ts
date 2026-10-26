import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

type Link = { path: string; title: string; description: string };

const sections: { heading: string; links: Link[] }[] = [
	{
		heading: "Product",
		links: [
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
					"Members reserve wheels, hand-building tables and the slab roller in one-hour blocks, with rules per membership tier.",
			},
		],
	},
	{
		heading: "Pricing",
		links: [
			{
				path: "/pricing",
				title: "Pricing",
				description:
					"Starter, Studio and Collective plans, billed monthly in USD, all with a 30-day free trial.",
			},
		],
	},
	{
		heading: "Company",
		links: [
			{
				path: "/about",
				title: "About Kilnbook",
				description:
					"Started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
			},
			{
				path: "/contact",
				title: "Book a demo",
				description: "Book a 20-minute Kilnbook demo or reach the support team.",
			},
		],
	},
];

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const guides: Link[] = [
		{
			path: "/blog",
			title: "Journal",
			description:
				"Notes on running a pottery studio: firing schedules, pricing classes and membership rules.",
		},
		...posts.map((p) => ({
			path: `/blog/${p.id}`,
			title: p.data.title,
			description: p.data.description,
		})),
	];

	const all = [...sections.slice(0, 2), { heading: "Guides", links: guides }, ...sections.slice(2)];

	const body = [
		"# Kilnbook",
		"",
		"> Kilnbook is booking and class-management software for pottery studios. It runs the parts of a studio that live on whiteboards and sticky notes: kiln firing queues, wheel time reservations, classes and class packs, and memberships, in one place.",
		"",
		...all.flatMap(({ heading, links }) => [
			`## ${heading}`,
			"",
			...links.map(
				(l) => `- [${l.title}](${new URL(l.path, site).href}): ${l.description}`,
			),
			"",
		]),
	].join("\n");

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
