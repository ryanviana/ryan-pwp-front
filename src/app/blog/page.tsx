"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts, BlogPost } from "@/lib/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from the API with fallback to static data
    const fetchBlogPosts = async () => {
      try {
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Show loading skeleton while fetching data
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: BlogPost) => (
          <article
            key={post.slug}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02]"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
              </div>

              <h2 className="text-xl font-semibold mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">
                {post.excerpt}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 font-medium inline-flex items-center group"
                >
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
