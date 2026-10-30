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

const authors = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		bio: z.string(),
	}),
});

export const collections = { blog, authors };
