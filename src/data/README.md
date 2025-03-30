# Centralized Content Management

This directory contains centralized data files for the entire portfolio website. When you want to make changes to your site content, you can edit these files directly instead of having to search through the codebase.

## File Structure

- `index.ts` - Main entry point that exports all data and helper functions
- `siteConfig.ts` - Basic site configuration (name, contact info, social links)
- `projects.ts` - Project portfolio data
- `blog.ts` - Blog post content
- `experience.ts` - Work experience, achievements, and education
- `skills.ts` - Skills and technologies

## How to Edit Content

### Adding a New Project

1. Open `projects.ts`
2. Add a new project object to the `projects` array
3. Make sure to include all required fields and assign a unique ID and slug
4. Set `featured: true` if you want it to appear in the featured projects section

Example:

```typescript
{
  id: 7, // Use the next available ID
  title: "My New Project",
  description: "A short description of the project",
  fullDescription: "A more detailed description of the project...",
  image: "/path-to-image.jpg",
  tags: ["React", "TypeScript", "Firebase"],
  slug: "my-new-project", // Use a URL-friendly identifier
  demoUrl: "https://example.com/demo",
  githubUrl: "https://github.com/example/project",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  featured: true // Set to true if it should appear in featured projects
}
```

### Adding a New Blog Post

1. Open `blog.ts`
2. Add a new blog post object to the `blogPosts` array
3. Make sure to include all required fields
4. Consider adding related posts to improve navigation

### Updating Your Experience or Skills

1. Open the relevant file (`experience.ts` or `skills.ts`)
2. Add new items or modify existing ones
3. Follow the existing structure and format

## How It's Used

The data in these files is imported and used throughout the application. The `index.ts` file provides helper functions to get the data in the format needed by different components.

To get data in your components, import from the data directory:

```typescript
import { getFeaturedProjects, workExperiences, siteConfig } from "@/data";
```

## Backward Compatibility

The legacy `src/lib` files now import from this centralized data system. This provides backward compatibility while allowing easier content management.
