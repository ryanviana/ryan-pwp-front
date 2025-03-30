"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FeaturedProjects from "@/components/FeaturedProjects";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  scaleUp,
} from "@/lib/animations";
import { siteConfig } from "@/data";
import { getFeaturedSkills } from "@/lib/skills";

export default function Home() {
  const [featuredSkills, setFeaturedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const skills = await getFeaturedSkills();
        setFeaturedSkills(skills);
      } catch (error) {
        console.error("Error loading skills:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return (
    <motion.div
      key="home-page-container"
      className="container mx-auto px-4 py-6 md:py-12 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Hero Section with enhanced visuals */}
      <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 mb-10 md:mb-20">
        {/* Content */}
        <motion.div
          key="hero-content"
          className="flex-1 text-center md:text-left z-10 pt-8 md:pt-0 order-2 md:order-1"
          variants={slideInLeft}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
            Hi, I'm Ryan!
            <span className="animated-gradient-text">
              {siteConfig.name.split(" ")[0]}
            </span>
          </h1>
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-3 md:mb-6"
            variants={fadeInUp}
          >
            {siteConfig.title}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-5 md:mb-8 max-w-lg mx-auto md:mx-0"
            variants={fadeInUp}
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/projects"
                className="btn btn-primary px-5 py-3 rounded-lg w-full sm:w-auto"
              >
                <span className="relative z-10">View Projects</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="btn btn-secondary px-5 py-3 rounded-lg w-full sm:w-auto"
              >
                <span>Contact Me</span>
                <motion.span
                  key="arrow-icon"
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.75,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          key="hero-profile"
          className="flex-1 flex justify-center mt-8 md:mt-0 z-10 order-1 md:order-2"
          variants={slideInRight}
        >
          <motion.div
            key="profile-image-container"
            className="relative w-56 h-56 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              key="profile-gradient"
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"
              animate={{
                boxShadow: [
                  "0px 0px 20px 0px rgba(79, 70, 229, 0.3)",
                  "0px 0px 40px 5px rgba(79, 70, 229, 0.4)",
                  "0px 0px 20px 0px rgba(79, 70, 229, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white dark:border-gray-800">
              <Image
                src="/profile-placeholder.jpg"
                alt="Ryan's profile"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
                priority
                className="scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <motion.section className="mb-12 md:mb-20" variants={fadeInUp}>
        <div className="flex items-center mb-6 md:mb-8">
          <motion.h2
            key="projects-heading"
            className="text-xl md:text-3xl font-bold"
            variants={fadeInUp}
          >
            Featured <span className="animated-gradient-text">Projects</span>
          </motion.h2>
          <motion.div
            key="projects-heading-line"
            className="ml-4 h-0.5 flex-grow bg-gradient-to-r from-blue-600 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
        </div>
        <FeaturedProjects />
      </motion.section>

      {/* Skills Section with interactive cards */}
      <motion.section className="mb-12 md:mb-20" variants={fadeInUp}>
        <div className="flex items-center mb-6 md:mb-8">
          <motion.h2
            key="skills-heading"
            className="text-xl md:text-3xl font-bold"
            variants={fadeInUp}
          >
            Technical <span className="animated-gradient-text">Skills</span>
          </motion.h2>
          <motion.div
            key="skills-heading-line"
            className="ml-4 h-0.5 flex-grow bg-gradient-to-r from-blue-600 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
        </div>

        <motion.div
          key="skills-grid"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6"
          variants={staggerContainer}
        >
          {featuredSkills.map((skill, index) => {
            // Map skill names to icons
            const skillIcons: Record<string, string> = {
              JavaScript: "⚡",
              TypeScript: "🔷",
              React: "⚛️",
              "Next.js": "▲",
              "Node.js": "🟢",
              "CSS/Tailwind": "🎨",
              "REST APIs": "🔌",
              Git: "📊",
            };

            return (
              <motion.div
                key={skill}
                className="card p-3 md:p-5 text-center"
                variants={scaleUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  key={`skill-icon-${skill}`}
                  className="text-xl md:text-2xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  {skillIcons[skill] || "🔧"}
                </motion.div>
                <div className="text-xs sm:text-sm md:text-base font-medium">
                  {skill}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Call to Action with enhanced design */}
      <motion.section
        className="relative overflow-hidden rounded-xl p-5 md:p-10 text-center mb-8"
        variants={fadeInUp}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <motion.div
          key="cta-container"
          className="relative z-10"
          variants={staggerContainer}
        >
          <motion.h2
            key="cta-heading"
            className="text-lg sm:text-xl md:text-3xl font-bold mb-3 md:mb-4 text-white"
            variants={fadeInUp}
          >
            Interested in working together?
          </motion.h2>
          <motion.p
            key="cta-description"
            className="text-sm md:text-lg text-white text-opacity-90 mb-4 md:mb-6 max-w-lg mx-auto"
            variants={fadeInUp}
          >
            Let's discuss how I can help with your next project and turn your
            ideas into reality.
          </motion.p>
          <motion.div
            key="cta-button-container"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-medium px-6 py-2 sm:px-8 sm:py-3 rounded-lg shadow-md transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                Get in Touch
                <motion.svg
                  key="cta-arrow-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.75,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    key="cta-arrow-path"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </motion.svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
