import { execFileSync } from "node:child_process";

export type PageKind = "home" | "product" | "pricing" | "company" | "guides";

export interface SitePage {
	path: string;
	title: string;
	kind: PageKind;
	summary: string;
	/** Source file, used for the page's last-changed date. */
	file: string;
}

export const sitePages: SitePage[] = [
	{
		path: "/",
		title: "Kilnbook",
		kind: "home",
		summary: "Overview of Kilnbook for pottery studios.",
		file: "src/pages/index.astro",
	},
	{
		path: "/features/firings",
		title: "Kiln firing queues",
		kind: "product",
		summary:
			"Track bisque and glaze loads, charge firing fees by cubic inch, and text members when pieces are ready for pickup.",
		file: "src/pages/features/firings.astro",
	},
	{
		path: "/features/classes",
		title: "Classes and class packs",
		kind: "product",
		summary:
			"Sell multi-week courses, drop-in sessions and class packs, with waitlists that fill cancelled seats automatically.",
		file: "src/pages/features/classes.astro",
	},
	{
		path: "/features/wheel-time",
		title: "Wheel and table booking",
		kind: "product",
		summary:
			"Members reserve wheels and hand-building tables in one-hour blocks, with limits set per membership tier.",
		file: "src/pages/features/wheel-time.astro",
	},
	{
		path: "/pricing",
		title: "Pricing",
		kind: "pricing",
		summary:
			"Starter, Studio and Collective monthly plans, all with a 30-day free trial.",
		file: "src/pages/pricing.astro",
	},
	{
		path: "/blog",
		title: "Journal",
		kind: "guides",
		summary:
			"Notes on running a pottery studio: firing schedules, pricing classes and membership rules.",
		file: "src/pages/blog/index.astro",
	},
	{
		path: "/about",
		title: "About Kilnbook",
		kind: "company",
		summary: "Who builds Kilnbook and how it started in a Portland community studio.",
		file: "src/pages/about.astro",
	},
	{
		path: "/contact",
		title: "Book a demo",
		kind: "company",
		summary: "Book a 20-minute demo or reach the support team.",
		file: "src/pages/contact.astro",
	},
];

/** Final URL of a page as served (directory format adds a trailing slash). */
export function pageUrl(path: string, site: URL | undefined): string {
	const withSlash = path.endsWith("/") ? path : `${path}/`;
	return new URL(withSlash, site).href;
}

/** Date of the last commit that touched a file, or undefined if git history is unavailable. */
export function lastCommitDate(file: string): string | undefined {
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
