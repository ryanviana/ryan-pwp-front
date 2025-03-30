import { SkillCategory, skillCategories, featuredSkills } from "@/data";
import * as api from "./api";
import { fetchWithFallback } from "./api";

export type { SkillCategory };

export async function getAllSkillCategories(): Promise<SkillCategory[]> {
  return await fetchWithFallback(() => api.getSkills(), skillCategories);
}

export async function getFeaturedSkills(): Promise<string[]> {
  try {
    const skills = await getAllSkillCategories();
    // Flatten all skills and take the first 8 as featured skills
    const allSkills = skills.flatMap((category) => category.skills);
    return allSkills.slice(0, 8);
  } catch (error) {
    console.warn("Error getting featured skills, using fallback:", error);
    return featuredSkills;
  }
}
