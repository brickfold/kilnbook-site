export type PageKind = "home" | "product" | "pricing" | "company" | "guides";

export interface SitePage {
	path: string;
	kind: PageKind;
	title: string;
	summary: string;
}

// Static routes under src/pages. Used by /sitemap.xml and /llms.txt;
// journal posts are added from the blog collection automatically.
export const staticPages: SitePage[] = [
	{
		path: "/",
		kind: "home",
		title: "Kilnbook",
		summary:
			"Booking and class-management software for pottery studios: kiln firing queues, wheel time reservations, class packs and memberships in one place.",
	},
	{
		path: "/pricing",
		kind: "pricing",
		title: "Pricing",
		summary:
			"Simple monthly pricing for pottery studios of every size. Starter, Studio and Collective plans, all with a 30-day free trial.",
	},
	{
		path: "/about",
		kind: "company",
		title: "About Kilnbook",
		summary:
			"Kilnbook was started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
	},
	{
		path: "/contact",
		kind: "company",
		title: "Contact",
		summary: "Book a 20-minute Kilnbook demo or reach our support team. We reply within one business day.",
	},
	{
		path: "/features/firings",
		kind: "product",
		title: "Kiln firing queues",
		summary:
			"Track bisque and glaze loads, charge firing fees by cubic inch, and text members when their pieces are ready for pickup.",
	},
	{
		path: "/features/classes",
		kind: "product",
		title: "Classes and class packs",
		summary:
			"Sell multi-week pottery courses, drop-in sessions and class packs with waitlists that fill cancelled seats automatically.",
	},
	{
		path: "/features/wheel-time",
		kind: "product",
		title: "Wheel and table booking",
		summary:
			"Members reserve wheels and hand-building tables in one-hour blocks, with limits you set per membership tier.",
	},
	{
		path: "/blog",
		kind: "guides",
		title: "Journal",
		summary:
			"Notes on running a pottery studio: firing schedules, pricing classes, membership rules and what we are building at Kilnbook.",
	},
];
