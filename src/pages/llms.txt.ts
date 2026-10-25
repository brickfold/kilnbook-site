import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

type Entry = { path: string; title: string; summary: string };

const product: Entry[] = [
	{
		path: "/",
		title: "Kilnbook",
		summary:
			"Overview of Kilnbook: kiln firing queues, wheel time reservations, class packs and memberships in one place.",
	},
	{
		path: "/features/firings",
		title: "Kiln firing queues",
		summary:
			"Track bisque and glaze loads, charge firing fees by cubic inch, and text members when their pieces are ready for pickup.",
	},
	{
		path: "/features/classes",
		title: "Classes and class packs",
		summary:
			"Sell multi-week pottery courses, drop-in sessions and class packs with waitlists that fill cancelled seats automatically.",
	},
	{
		path: "/features/wheel-time",
		title: "Wheel and table booking",
		summary:
			"Members reserve wheels, hand-building tables and shared equipment in one-hour blocks, with limits set per membership tier.",
	},
];

const pricing: Entry[] = [
	{
		path: "/pricing",
		title: "Pricing",
		summary:
			"Simple monthly pricing for pottery studios of every size. Starter, Studio and Collective plans, all with a 30-day free trial.",
	},
];

const company: Entry[] = [
	{
		path: "/about",
		title: "About Kilnbook",
		summary:
			"Kilnbook was started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
	},
	{
		path: "/contact",
		title: "Contact",
		summary: "Book a 20-minute Kilnbook demo or reach our support team. We reply within one business day.",
	},
];

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	const guides: Entry[] = [
		{
			path: "/blog",
			title: "Journal",
			summary:
				"Notes on running a pottery studio: firing schedules, pricing classes, membership rules and what we are building at Kilnbook.",
		},
		...posts.map((post) => ({
			path: `/blog/${post.id}`,
			title: post.data.title,
			summary: post.data.description,
		})),
	];

	const section = (heading: string, entries: Entry[]) =>
		`## ${heading}\n\n${entries
			.map((e) => `- [${e.title}](${new URL(e.path, site).href}): ${e.summary}`)
			.join("\n")}\n`;

	const body = `# Kilnbook

> Kilnbook is booking and class-management software for pottery studios. It runs the parts of a studio that live on whiteboards and sticky notes: kiln firing queues and fees, wheel and equipment reservations, multi-week classes, drop-in sessions, class packs and memberships. Kilnbook started in a 14-wheel community studio in Portland, Oregon, and over 340 studios in the US, Canada and the UK now use it. Every plan starts with a 30-day free trial, no card needed.

${section("Product", product)}
${section("Pricing", pricing)}
${section("Guides", guides)}
${section("Company", company)}`;

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
