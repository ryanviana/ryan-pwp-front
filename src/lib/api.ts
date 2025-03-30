/**
 * API Client for the Portfolio Backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const DEBUG = process.env.NODE_ENV === "development";

/**
 * Base fetch function with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  if (DEBUG) {
    console.log(`🔄 API Request: ${url}`);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as T;

    if (DEBUG) {
      console.log(`✅ API Response: ${url}`, {
        status: response.status,
        dataPreview: Array.isArray(data)
          ? `Array with ${data.length} items`
          : "Object response",
      });
    }

    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error);
    throw error;
  }
}

// Project endpoints
export async function getAllProjects() {
  return fetchAPI<any[]>("/projects");
}

export async function getFeaturedProjects() {
  return fetchAPI<any[]>("/projects/featured");
}

export async function getProjectBySlug(slug: string) {
  return fetchAPI<any>(`/projects/${slug}`);
}

// Blog endpoints
export async function getAllBlogPosts() {
  return fetchAPI<any[]>("/blog");
}

export async function getBlogPostBySlug(slug: string) {
  return fetchAPI<any>(`/blog/${slug}`);
}

export async function getLatestBlogPosts(count: number = 3) {
  const posts = await getAllBlogPosts();
  return posts.slice(0, count);
}

// Experience endpoints
export async function getWorkExperience() {
  return fetchAPI<any[]>("/experience/work");
}

export async function getAchievements() {
  return fetchAPI<any[]>("/experience/achievements");
}

export async function getEducation() {
  return fetchAPI<any[]>("/experience/education");
}

// Skills endpoints
export async function getSkills() {
  return fetchAPI<any[]>("/skills");
}

// Helper function to handle API failures
export async function fetchWithFallback<T>(
  apiCall: () => Promise<T>,
  fallbackData: T
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.warn("API call failed, using fallback data:", error);
    return fallbackData;
  }
}
