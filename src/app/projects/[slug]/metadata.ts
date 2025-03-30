import { Metadata } from "next";
import { getProjectBySlug } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found | Ryan's Portfolio",
      description: "The requested project could not be found",
    };
  }

  return {
    title: `${project.title} | Ryan's Portfolio`,
    description: project.description,
  };
}
