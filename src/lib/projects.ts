import {
  Project,
  projects,
  getFeaturedProjects as getDataFeaturedProjects,
  getProjectBySlug as getDataProjectBySlug,
} from "@/data";

// We need to maintain async functions for backward compatibility
export const getAllProjects = async (): Promise<Project[]> => {
  return projects;
};

export const getProjectBySlug = async (
  slug: string
): Promise<Project | null> => {
  return getDataProjectBySlug(slug);
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  return getDataFeaturedProjects();
};

// Re-export the Project type
export type { Project };
