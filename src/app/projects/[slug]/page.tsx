"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Project, getProjectBySlug } from "@/data";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (typeof params.slug !== "string") {
          setLoading(false);
          return;
        }

        const projectData = getProjectBySlug(params.slug);
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="w-full h-80 lg:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"
                  ></div>
                ))}
              </div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If project not found, show a 404 page
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/projects"
        className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="relative w-full h-80 lg:h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">About this Project</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {project.fullDescription || project.description}
            </p>
          </div>

          {project.features && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                <span>Live Demo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
        <h2 className="text-2xl font-semibold mb-6">More Projects</h2>
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
