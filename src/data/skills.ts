export interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Frontend",
    skills: [
      "JavaScript / TypeScript",
      "React.js",
      "Next.js",
      "HTML5 / CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: 2,
    name: "Backend",
    skills: [
      "Java / Spring Boot",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "RESTful APIs",
    ],
  },
  {
    id: 3,
    name: "Web3 & Others",
    skills: [
      "Blockchain / Smart Contracts",
      "Solidity",
      "Git / GitHub",
      "Docker",
      "Agile / Scrum",
    ],
  },
];

// Simple list of skills for homepage display
export const featuredSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "CSS/Tailwind",
  "REST APIs",
  "Git",
];
