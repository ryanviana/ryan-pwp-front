"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import { SkillCategory } from "@/data";
import {
  getWorkExperience,
  getEducation,
  getAchievements,
} from "@/lib/experience";
import { getAllSkillCategories } from "@/lib/skills";

const AboutPage = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [workExperiences, setWorkExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [achievementsData, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert skills to the format expected by the skill bars
  const skillsWithLevels = skillCategories.flatMap((category) =>
    category.skills.map((skill, index) => {
      // Generate a somewhat random but consistent level between 75 and 95
      const level = 75 + (((index + 1) * category.id * 7) % 21);
      return {
        name: skill,
        level,
      };
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [skills, work, edu, achievements] = await Promise.all([
          getAllSkillCategories(),
          getWorkExperience(),
          getEducation(),
          getAchievements(),
        ]);

        setSkillCategories(skills);
        setWorkExperiences(work);
        setEducations(edu);
        setAchievements(achievements);
      } catch (error) {
        console.error("Error loading about page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        About Me
      </motion.h1>
      <motion.p
        className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16"
        variants={fadeInUp}
      >
        Get to know more about me, my experience, and my skills.
      </motion.p>

      {/* Hero Section */}
      <motion.div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <motion.div className="w-full md:w-1/2" variants={slideInLeft}>
          <h2 className="text-2xl font-bold mb-4">Hi, I'm Ryan</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            I'm a passionate software developer with experience building web
            applications. I specialize in frontend development with React and
            Next.js, but I'm also comfortable working with backend technologies
            like Java and Node.js.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            My approach to development focuses on creating intuitive,
            performant, and accessible user experiences. I believe in writing
            clean, maintainable code and staying up-to-date with the latest
            industry trends and best practices.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm currently launching a startup focused on the AI space. I'm
            passionate about learning more about entrepreneurship and scaling a
            business effectively.
          </p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              className="btn btn-primary px-6 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="btn px-6 py-2">
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          variants={slideInRight}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl">
            <Image
              src="/profile_contact_me.png"
              alt="Profile"
              fill
              sizes="(max-width: 768px) 16rem, 20rem"
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div className="mb-16" variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-2 text-center">My Skills</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-8"></div>

        {skillCategories.map((category, categoryIndex) => (
          <div key={category.id} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 ml-4"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {category.skills.map((skill, index) => {
                // Generate a somewhat random but consistent level between 75 and 95 for the gradient
                const level = 75 + (((index + 1) * category.id * 7) % 21);
                const randomDelay = (Math.random() * 0.3).toFixed(2);
                const angle = (index * 37) % 360;
                return (
                  <motion.div
                    key={`${category.id}-${index}`}
                    className="relative z-0 group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: categoryIndex * 0.1 + index * 0.03,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="relative h-28 rounded-xl overflow-hidden shadow-lg border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm">
                      {/* Animated background gradient */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-all duration-500"
                        style={{
                          backgroundImage: `linear-gradient(${angle}deg, #3b82f6, #8b5cf6, #ec4899)`,
                          backgroundSize: "200% 200%",
                          animation: `gradient 8s ease infinite ${randomDelay}s`,
                        }}
                      ></div>

                      {/* Glass effect container */}
                      <div className="absolute inset-0.5 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
                        {/* Inner content */}
                        <div className="text-center px-3 relative z-10">
                          <div className="font-medium text-lg mb-1.5">
                            {skill}
                          </div>
                          <div className="w-12 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 transform group-hover:scale-150 transition-transform duration-300"></div>
                        </div>
                      </div>

                      {/* Edge highlights */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute -inset-1.5 top-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Experience Section */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-8 text-center">Work Experience</h2>
        <div className="space-y-8">
          {workExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="card p-6 relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg"></div>
              <div className="ml-2">
                <h3 className="font-bold text-xl">{exp.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="hidden sm:block mx-2">•</span>
                      <span>{exp.location}</span>
                    </>
                  )}
                  <span className="hidden sm:block mx-2">•</span>
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                  {exp.description.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div variants={fadeInUp} className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Education</h2>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="card p-6 relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg"></div>
              <div className="ml-2">
                <h3 className="font-bold text-xl">{edu.degree}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium">{edu.institution}</span>
                  {edu.location && (
                    <>
                      <span className="hidden sm:block mx-2">•</span>
                      <span>{edu.location}</span>
                    </>
                  )}
                  <span className="hidden sm:block mx-2">•</span>
                  <span>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {edu.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div variants={fadeInUp} className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Achievements</h2>
        <div className="space-y-8">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="card p-6 relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg"></div>
              <div className="ml-2">
                <h3 className="font-bold text-xl">{achievement.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium">
                    {achievement.organization}
                  </span>
                  <span className="hidden sm:block mx-2">•</span>
                  <span>{achievement.date}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div className="mt-16 text-center py-12 card" variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          I'm currently available for freelance work or full-time positions. If
          you're interested in collaborating or have any questions, feel free to
          reach out!
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

export default AboutPage;
