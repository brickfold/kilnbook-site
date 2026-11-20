import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		author: z.string(),
	}),
});

const changelog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		area: z.enum(["Kiln firings", "Classes & packs", "Wheel time", "Memberships"]).optional(),
		link: z.string().optional(),
	}),
});

export const collections = { blog, changelog };
