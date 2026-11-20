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

const glossary = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
	schema: z.object({
		term: z.string(),
		description: z.string(),
		group: z.enum(["Bisque", "Glaze firing", "Cones"]),
	}),
});

export const collections = { blog, glossary };
