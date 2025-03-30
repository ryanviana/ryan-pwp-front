import {
  BlogPost,
  RelatedPost,
  blogPosts,
  getBlogPostBySlug as getDataBlogPostBySlug,
  getLatestBlogPosts as getDataLatestBlogPosts,
} from "@/data";

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
  return [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return getDataBlogPostBySlug(slug);
}

// Mock implementation for loadBlogPostsFromFiles - in a real app, this would
// load from actual markdown files, but for now it returns the mock data
export async function loadBlogPostsFromFiles(): Promise<BlogPost[]> {
  return getAllBlogPosts();
}
