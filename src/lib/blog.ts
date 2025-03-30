import {
  BlogPost,
  RelatedPost,
  blogPosts,
  getBlogPostBySlug as getDataBlogPostBySlug,
  getLatestBlogPosts as getDataLatestBlogPosts,
} from "@/data";
import * as api from "./api";
import { fetchWithFallback } from "./api";

// Re-export the types
export type { BlogPost, RelatedPost };

// Helper function to calculate reading time
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Maintain backward compatibility with async functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await fetchWithFallback(
    () => api.getAllBlogPosts(),
    [...blogPosts].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return await fetchWithFallback(
    () => api.getBlogPostBySlug(slug),
    getDataBlogPostBySlug(slug)
  );
}

// Now this will actually load from the API, with static data as fallback
export async function loadBlogPostsFromFiles(): Promise<BlogPost[]> {
  return getAllBlogPosts();
}
