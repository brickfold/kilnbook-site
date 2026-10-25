import { execFileSync } from "node:child_process";
import { getCollection } from "astro:content";

export type PageKind = "home" | "product" | "pricing" | "company" | "guide" | "guides";

export interface SitePage {
	path: string;
	kind: PageKind;
	title: string;
	description: string;
	/** Source files whose last commit decides the page's last-changed date. */
	files: string[];
	/** Used when git history is unavailable. */
	fallbackDate?: Date;
}

const staticPages: SitePage[] = [
	{
		path: "/",
		kind: "home",
		title: "Kilnbook",
		description:
			"Booking and class-management software for pottery studios: kiln firing queues, wheel time reservations, class packs and memberships in one place.",
		files: ["src/pages/index.astro"],
	},
	{
		path: "/pricing",
		kind: "pricing",
		title: "Pricing",
		description:
			"Starter, Studio and Collective plans for pottery studios of every size, all with a 30-day free trial.",
		files: ["src/pages/pricing.astro"],
	},
	{
		path: "/about",
		kind: "company",
		title: "About Kilnbook",
		description:
			"Started in 2022 by a studio owner and a software engineer in Portland, Oregon, to replace the kiln log clipboard.",
		files: ["src/pages/about.astro"],
	},
	{
		path: "/contact",
		kind: "company",
		title: "Contact",
		description: "Book a 20-minute Kilnbook demo or reach the support team.",
		files: ["src/pages/contact.astro"],
	},
	{
		path: "/features/firings",
		kind: "product",
		title: "Kiln firing queues",
		description:
			"Track bisque and glaze loads, charge firing fees by cubic inch, and text members when their pieces are ready for pickup.",
		files: ["src/pages/features/firings.astro"],
	},
	{
		path: "/features/classes",
		kind: "product",
		title: "Classes and class packs",
		description:
			"Sell multi-week pottery courses, drop-in sessions and class packs with waitlists that fill cancelled seats automatically.",
		files: ["src/pages/features/classes.astro"],
	},
	{
		path: "/features/wheel-time",
		kind: "product",
		title: "Wheel and table booking",
		description:
			"Members reserve wheels, hand-building tables and the slab roller in one-hour blocks, with limits set per membership tier.",
		files: ["src/pages/features/wheel-time.astro"],
	},
	{
		path: "/blog",
		kind: "guides",
		title: "Journal",
		description:
			"Notes on running a pottery studio: firing schedules, pricing classes, membership rules and what we are building at Kilnbook.",
		files: ["src/pages/blog/index.astro", "src/content/blog"],
	},
];

export async function getSitePages(): Promise<SitePage[]> {
	const posts = (await getCollection("blog")).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return [
		...staticPages,
		...posts.map(
			(post): SitePage => ({
				path: `/blog/${post.id}`,
				kind: "guide",
				title: post.data.title,
				description: post.data.description,
				files: post.filePath ? [post.filePath] : [],
				fallbackDate: post.data.pubDate,
			}),
		),
	];
}

const commitDates = new Map<string, Date | undefined>();

function lastCommitDate(file: string): Date | undefined {
	if (!commitDates.has(file)) {
		let date: Date | undefined;
		try {
			const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
				encoding: "utf8",
				stdio: ["ignore", "pipe", "ignore"],
			}).trim();
			if (out) date = new Date(out);
		} catch {
			date = undefined;
		}
		commitDates.set(file, date);
	}
	return commitDates.get(file);
}

/** The page's real last-changed date: the latest commit touching its source files. */
export function lastModified(page: SitePage): Date | undefined {
	const dates = page.files
		.map(lastCommitDate)
		.filter((d): d is Date => d !== undefined && !Number.isNaN(d.valueOf()));
	if (dates.length === 0) return page.fallbackDate;
	return new Date(Math.max(...dates.map((d) => d.valueOf())));
}
