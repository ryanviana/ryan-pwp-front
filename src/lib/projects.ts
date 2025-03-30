import {
  Project,
  projects,
  getFeaturedProjects as getDataFeaturedProjects,
  getProjectBySlug as getDataProjectBySlug,
} from "@/data";
import * as api from "./api";
import { fetchWithFallback } from "./api";

// We need to maintain async functions for backward compatibility
export const getAllProjects = async (): Promise<Project[]> => {
  return await fetchWithFallback(() => api.getAllProjects(), projects);
};

export const getProjectBySlug = async (
  slug: string
): Promise<Project | null> => {
  return await fetchWithFallback(
    () => api.getProjectBySlug(slug),
    getDataProjectBySlug(slug)
  );
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return await fetchWithFallback(
    () => api.getFeaturedProjects(),
    getDataFeaturedProjects()
  );
};

// Re-export the Project type
export type { Project };
