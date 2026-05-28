import type { ProjectId } from "@/data/project-ids";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";

export { projects };

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectById = (id: ProjectId) => projects.find((p) => p.id === id);

export const getProjectPath = (locale: Locale, id: ProjectId) =>
  locale === "ja" ? `/works/${id}/` : `/${locale}/works/${id}/`;

export const getWorksPath = (locale: Locale) => (locale === "ja" ? "/works/" : `/${locale}/works/`);
