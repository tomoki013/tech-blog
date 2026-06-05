export const projectIds = [
  "tabidea",
  "nobo-page",
  "travel-diary",
  "tech-blog",
  "developer-status-links",
  "github-kurorekishi",
] as const;

export type ProjectId = (typeof projectIds)[number];
