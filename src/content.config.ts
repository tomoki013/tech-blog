import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";
import { projectIds } from "@/data/project-ids";

const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    projectIds: z.array(z.enum(projectIds)).default([]),
  }),
});

export const collections = { articles };
