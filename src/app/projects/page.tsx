"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Project, projects as projectsData } from "@/data";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load projects from the data file
    const fetchProjects = async () => {
      try {
        // Extract unique categories from tags
        const allTags = projectsData.flatMap((project) => project.tags);
        const uniqueCategories = ["all", ...new Set(allTags)];

        setProjects(projectsData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedCategory));

  // Render loading placeholder
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between pt-2">
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        variants={fadeInUp}
      >
        My Projects
      </motion.h1>
      <motion.p
        className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12"
        variants={fadeInUp}
      >
        Browse through my latest projects. Each project represents a unique
        challenge and solution.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-10"
        variants={fadeInUp}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            } transition-all`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="card overflow-hidden flex flex-col h-full"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative overflow-hidden aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-800 text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    Live Demo
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors ml-auto"
                >
                  Details
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-16 text-center" variants={fadeInUp}>
        <h3 className="text-xl font-bold mb-4">Interested in collaborating?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          I'm always open to discussing new projects and opportunities. Let's
          create something amazing together.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/contact"
            className="btn btn-primary px-8 py-3 rounded-lg inline-block"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage;
