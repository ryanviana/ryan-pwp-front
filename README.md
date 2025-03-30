# Portfolio Website - Content Management Guide

This portfolio website features a centralized content management system that makes it easy to update your information without digging through the codebase.

## Centralized Content System

All content is stored in the `src/data` directory:

```
src/data/
├── blog.ts        # Blog posts
├── experience.ts  # Work experience, achievements, education
├── index.ts       # Main exports and helper functions
├── projects.ts    # Portfolio projects
├── siteConfig.ts  # Basic site information and social links
└── skills.ts      # Skills and technologies
```

## How to Update Your Content

### Basic Information and Social Links

To update your name, contact information, and social links, edit the `src/data/siteConfig.ts` file:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "Your Phone Number",
  location: "Your Location",
  description: "Your professional summary...",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
  resumeUrl: "/your-resume.pdf", // Place your resume in the public folder
};
```

### Portfolio Projects

To add, remove, or edit projects, modify the `projects` array in `src/data/projects.ts`:

1. Each project needs the following required fields:

   - `id`: Unique number identifier
   - `title`: Project name
   - `description`: Short summary
   - `image`: Path to the project image (in the public folder)
   - `tags`: Array of technologies used
   - `slug`: URL-friendly identifier (for the project detail page)

2. Optional fields include:
   - `fullDescription`: Detailed project description
   - `demoUrl`: Link to live demo
   - `githubUrl`: Link to GitHub repository
   - `features`: Array of key features
   - `featured`: Set to `true` to show on the homepage (default is `false`)

Example of adding a new project:

```typescript
{
  id: 7, // Use the next available ID
  title: "New Portfolio Project",
  description: "A short description of your new project",
  fullDescription: "A more detailed description of what this project does and how you built it...",
  image: "/project-new.jpg", // Add this image to the public folder
  tags: ["React", "TypeScript", "Firebase"],
  slug: "new-portfolio-project",
  demoUrl: "https://example.com/demo",
  githubUrl: "https://github.com/yourusername/project",
  features: [
    "Key feature 1",
    "Key feature 2",
    "Key feature 3"
  ],
  featured: true // Will appear on homepage
}
```

### Blog Posts

To manage blog posts, edit the `blogPosts` array in `src/data/blog.ts`:

1. Each blog post needs:

   - `slug`: URL-friendly identifier
   - `title`: Post title
   - `date`: Publication date (YYYY-MM-DD format)
   - `excerpt`: Brief summary shown in listings
   - `coverImage`: Path to the cover image
   - `readingTime`: Estimated reading time
   - `tags`: Array of relevant topics
   - `content`: The full post content in Markdown format

2. You can also add related posts to improve navigation:
   - `relatedPosts`: Array of objects with `slug`, `title`, and `coverImage`

### Work Experience and Education

Update your professional background in `src/data/experience.ts`:

1. Work Experience (`workExperiences` array):

   - `id`: Unique number identifier
   - `title`: Job title
   - `company`: Company name
   - `location`: Where you worked (optional)
   - `startDate`: When you started (e.g., "January 2024")
   - `endDate`: When you left (or "Present")
   - `description`: Array of bullet points describing responsibilities

2. Achievements (`achievements` array):

   - `id`: Unique number identifier
   - `title`: Achievement name
   - `organization`: Where you achieved it
   - `date`: When you achieved it
   - `description`: Details about the achievement

3. Education (`education` array):
   - `id`: Unique number identifier
   - `degree`: Name of degree/certificate
   - `institution`: School/university name
   - `startYear`: Year you started
   - `endYear`: Year you completed (or expected)
   - `location`: Where you studied (optional)
   - `description`: Additional details (optional)

### Skills and Technologies

Edit your skills in `src/data/skills.ts`:

1. Skill Categories (`skillCategories` array):

   - Each category has an `id`, `name`, and array of `skills`
   - Organized by category (Frontend, Backend, etc.)

2. Featured Skills (`featuredSkills` array):
   - Simple array of strings for the homepage

## How to Add Images

For project images, blog cover images, and other visual content:

1. Place image files in the `/public` directory
2. Reference them in the data files using paths like `/image-name.jpg`

## Notes

- All changes to the data files will be reflected throughout the site automatically
- Keep IDs unique across each data type
- Use descriptive slugs for better SEO and readability
- This system maintains backward compatibility with existing code

For more detailed instructions, see the README in the `src/data` directory.
