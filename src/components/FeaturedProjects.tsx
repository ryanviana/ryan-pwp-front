"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/data";
import { getFeaturedProjects } from "@/lib/projects";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const featuredProjects = await getFeaturedProjects();
        setProjects(featuredProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="card rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-36 sm:h-40 md:h-48 bg-gray-200 dark:bg-gray-700 opacity-50"></div>
            <div className="p-3 sm:p-4 md:p-6">
              <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-2 sm:mb-3 md:mb-4 opacity-50"></div>
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-2 opacity-50"></div>
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full mb-3 sm:mb-4 md:mb-6 opacity-50"></div>
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-12 sm:w-14 md:w-16 opacity-50"></div>
                <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-12 sm:w-14 md:w-16 opacity-50"></div>
              </div>
              <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3 opacity-50"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="card h-full flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{
            y: -5,
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="relative w-full h-36 sm:h-40 md:h-48 group overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-full h-full overflow-hidden">
              <div
                className="relative w-full h-full group-hover:scale-110 transition-transform duration-700"
                style={{ transformOrigin: "center" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-600 font-medium mb-2">
                Featured
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 relative hover:text-blue-600 transition-colors duration-200">
              {project.title}
              <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 w-0 group-hover:w-full transition-all duration-300" />
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 md:mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={`${project.id}-tag-${tagIndex}`}
                  className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="hover:translate-x-1 transition-transform duration-200">
              <Link
                href={`/projects/${project.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center text-xs sm:text-sm md:text-base"
              >
                View Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4 ml-1 animate-pulse-x"
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
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedProjects;
