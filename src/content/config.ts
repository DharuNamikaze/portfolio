import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.string().transform((str) => {
			// Parse DD-MM-YYYY format
			const [day, month, year] = str.split('-');
			return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
		}),
	}),
});

export const collections = { blog };