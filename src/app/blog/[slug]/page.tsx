import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getBlogPostBySlug,
  getAllBlogPosts,
  BlogPost,
  RelatedPost,
} from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Ryan's Portfolio",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: `${post.title} | Ryan's Portfolio`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Post Not Found</h1>
          <p className="mb-6">
            The blog post you're looking for does not exist.
          </p>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <MDXRemote source={post.content} />
        </div>

        {/* Author section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/profile-placeholder.jpg"
                alt="Ryan Viana"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ryan Viana</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Software developer and entrepreneur, specializing in web
                development, blockchain technology, and AI solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">Continue Reading</h2>

          {post.relatedPosts && post.relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost: RelatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="relative w-full h-40">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No related posts found.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                View all posts
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
