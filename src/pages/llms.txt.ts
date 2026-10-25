import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

type Link = { path: string; title: string; description: string };

const product: Link[] = [
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
			"Members reserve wheels, hand-building tables and the slab roller in one-hour blocks, with limits per membership tier.",
	},
];

const pricing: Link[] = [
	{
		path: "/pricing",
		title: "Pricing",
		description:
			"Simple monthly pricing for pottery studios of every size. Starter, Studio and Collective plans, all with a 30-day free trial.",
	},
];

const company: Link[] = [
	{
		path: "/about",
		title: "About Kilnbook",
		description:
			"Kilnbook was started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
	},
	{
		path: "/contact",
		title: "Contact",
		description:
			"Book a 20-minute Kilnbook demo or reach our support team. We reply within one business day.",
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
				"Notes on running a pottery studio: firing schedules, pricing classes, membership rules and what we are building at Kilnbook.",
		},
		...posts.map((p) => ({
			path: `/blog/${p.id}`,
			title: p.data.title,
			description: p.data.description,
		})),
	];

	const section = (heading: string, links: Link[]) =>
		[
			`## ${heading}`,
			"",
			...links.map((l) => `- [${l.title}](${new URL(l.path, site).href}): ${l.description}`),
		].join("\n");

	const body = [
		"# Kilnbook",
		"",
		"> Kilnbook is booking and class-management software for pottery studios. Studio owners use it to run kiln firing queues, wheel and table reservations, multi-week courses, drop-in sessions, class packs and memberships in one place, and members use it to book time and see when their pieces are ready.",
		"",
		section("Product", product),
		"",
		section("Pricing", pricing),
		"",
		section("Guides", guides),
		"",
		section("Company", company),
		"",
	].join("\n");

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
