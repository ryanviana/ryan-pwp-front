/**
 * Common type definitions for the portfolio application
 */

export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  location?: string;
  description?: string;
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
  slug: string;
}

export interface RelatedPost {
  slug: string;
  title: string;
  coverImage: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
  tags: string[];
  content: string;
  relatedPosts?: RelatedPost[];
  author?: string;
}
