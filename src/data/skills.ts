export interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Programming Languages",
    skills: ["Java", "JavaScript", "C", "TypeScript"],
  },
  {
    id: 2,
    name: "Backend Technologies",
    skills: [
      "Spring Boot",
      "REST APIs",
      "PostgreSQL",
      "Microsoft SQL Server",
      "MVC",
    ],
  },
  {
    id: 3,
    name: "Tools & Platforms",
    skills: [
      "Git",
      "Microsoft Power Platform",
      "Microsoft Power Automate",
      "Google Apps Script",
    ],
  },
  {
    id: 4,
    name: "Methodologies & Skills",
    skills: [
      "Scrum",
      "Agile",
      "Web Applications",
      "Chatbot Development",
      "Google Sheets",
      "English (B2 Level)",
    ],
  },
];

// Simple list of skills for homepage display
export const featuredSkills = [
  "JavaScript",
  "TypeScript",
  "Java",
  "Spring Boot",
  "REST APIs",
  "PostgreSQL",
  "Git",
  "Agile",
];
