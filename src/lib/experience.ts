import {
  WorkExperience,
  Achievement,
  Education,
  workExperiences,
  achievements,
  education,
} from "@/data";
import * as api from "./api";
import { fetchWithFallback } from "./api";

export type { WorkExperience, Achievement, Education };

export async function getWorkExperience(): Promise<WorkExperience[]> {
  return await fetchWithFallback(
    () => api.getWorkExperience(),
    workExperiences
  );
}

export async function getAchievements(): Promise<Achievement[]> {
  return await fetchWithFallback(() => api.getAchievements(), achievements);
}

export async function getEducation(): Promise<Education[]> {
  return await fetchWithFallback(() => api.getEducation(), education);
}
