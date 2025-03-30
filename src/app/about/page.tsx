"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import {
  skillCategories,
  workExperiences,
  education,
  achievements,
} from "@/data";

// Convert skills from the data file to the format expected by the skill bars
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

const AboutPage = () => {
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
            When I'm not coding, you'll find me hiking, reading, or
            experimenting with new technologies. I'm always eager to learn and
            take on new challenges.
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
              src="/profile-placeholder.jpg"
              alt="Profile"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div className="mb-16" variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-8 text-center">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillsWithLevels.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
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
                  {exp.description.map((item, i) => (
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
          {education.map((edu, index) => (
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
          {achievements.map((achievement, index) => (
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
