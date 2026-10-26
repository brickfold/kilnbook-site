import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

type Link = { title: string; path: string; description: string };

const sections: { heading: string; links: Link[] }[] = [
	{
		heading: "Product",
		links: [
			{
				title: "Kiln firing queues",
				path: "/features/firings",
				description:
					"Track bisque and glaze loads, charge firing fees by cubic inch, and text members when their pieces are ready for pickup.",
			},
			{
				title: "Classes and class packs",
				path: "/features/classes",
				description:
					"Sell multi-week pottery courses, drop-in sessions and class packs with waitlists that fill cancelled seats automatically.",
			},
			{
				title: "Wheel and table booking",
				path: "/features/wheel-time",
				description:
					"Members reserve wheels, hand-building tables and shared equipment in one-hour blocks, with booking rules per membership tier.",
			},
		],
	},
	{
		heading: "Pricing",
		links: [
			{
				title: "Pricing",
				path: "/pricing",
				description:
					"Simple monthly pricing for pottery studios of every size. Starter, Studio and Collective plans, all with a 30-day free trial.",
			},
		],
	},
	{
		heading: "Company",
		links: [
			{
				title: "About Kilnbook",
				path: "/about",
				description:
					"Kilnbook was started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
			},
			{
				title: "Contact",
				path: "/contact",
				description:
					"Book a 20-minute Kilnbook demo or reach our support team. We reply within one business day.",
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
			title: "Journal",
			path: "/blog",
			description:
				"Notes on running a pottery studio: firing schedules, pricing classes, membership rules and what we are building at Kilnbook.",
		},
		...posts.map((p) => ({
			title: p.data.title,
			path: `/blog/${p.id}`,
			description: p.data.description,
		})),
	];

	const allSections = [...sections, { heading: "Guides", links: guides }];
	const renderLink = (l: Link) => `- [${l.title}](${new URL(l.path, site).href}): ${l.description}`;

	const body = `# Kilnbook

> Kilnbook is booking and class-management software for pottery studios: kiln firing queues, wheel time reservations, class packs and memberships in one place.

Studio owners use Kilnbook to run the day-to-day of a community pottery studio. Members book wheels and equipment, sign up for classes and class packs, and follow their pieces through the kiln queue, while the studio sets the rules for each membership tier. Home page: ${new URL("/", site).href}

${allSections
	.map((s) => `## ${s.heading}\n\n${s.links.map(renderLink).join("\n")}`)
	.join("\n\n")}
`;
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
