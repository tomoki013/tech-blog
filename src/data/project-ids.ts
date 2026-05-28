export const projectIds = [
  "tabidea",
  "travel-diary",
  "tech-blog",
  "developer-status-links",
  "github-kurorekishi",
] as const;

export type ProjectId = (typeof projectIds)[number];
