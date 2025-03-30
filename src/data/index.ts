// Import types first
import { Project, projects } from "./projects";
import { BlogPost, RelatedPost, blogPosts } from "./blog";
import {
  WorkExperience,
  Achievement,
  Education,
  workExperiences,
  achievements,
  education,
} from "./experience";
import { SkillCategory, skillCategories, featuredSkills } from "./skills";
import { siteConfig } from "./siteConfig";

// Site Configuration
export { siteConfig };

// Projects Data
export { projects };
export type { Project };

// Blog Data
export { blogPosts };
export type { BlogPost, RelatedPost };

// Experience & Education Data
export { workExperiences, achievements, education };
export type { WorkExperience, Achievement, Education };

// Skills Data
export { skillCategories, featuredSkills };
export type { SkillCategory };

// Helper functions to get specific data
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

export const getProjectBySlug = (slug: string): Project | null => {
  return projects.find((project) => project.slug === slug) || null;
};

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  return blogPosts.find((post) => post.slug === slug) || null;
};

export const getLatestBlogPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};
