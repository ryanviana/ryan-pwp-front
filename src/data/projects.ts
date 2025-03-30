export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  tags: string[];
  slug: string;
  demoUrl?: string;
  githubUrl?: string;
  features?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB.",
    fullDescription:
      "This e-commerce platform provides a seamless shopping experience with features like user authentication, product catalog, shopping cart, payment processing, and order management. The frontend is built with Next.js and styled with Tailwind CSS, while the backend uses Node.js with Express and MongoDB for data storage.",
    image: "/project-placeholder-1.jpg",
    tags: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    slug: "ecommerce-platform",
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/ecommerce",
    features: [
      "User authentication and profile management",
      "Product catalog with search and filtering",
      "Shopping cart and checkout flow",
      "Payment processing integration",
      "Order history and tracking",
      "Admin dashboard for product management",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description:
      "A weather dashboard app that displays current and forecasted weather using a third-party API.",
    fullDescription:
      "This weather dashboard application allows users to search for any city and view current weather conditions as well as a 5-day forecast. It leverages the OpenWeatherMap API to fetch weather data and displays it in a user-friendly interface. The app includes features like location search, unit conversion, and weather visualization using charts.",
    image: "/project-placeholder-2.jpg",
    tags: ["React", "Weather API", "Chart.js", "CSS Modules"],
    slug: "weather-dashboard",
    demoUrl: "https://example.com/weather",
    githubUrl: "https://github.com/example/weather",
    features: [
      "City search with autocomplete",
      "Current weather conditions display",
      "5-day weather forecast",
      "Temperature, humidity, and wind speed charts",
      "Unit conversion (Celsius/Fahrenheit)",
      "Location-based weather detection",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A task management application with drag-and-drop functionality and user authentication.",
    fullDescription:
      "This task management application helps users organize their work with features like task creation, categorization, priority setting, and due date tracking. The app includes a drag-and-drop interface for easy task organization across different status columns. User authentication ensures that each user has access to only their tasks, and real-time updates are implemented using Firebase.",
    image: "/project-placeholder-3.jpg",
    tags: ["TypeScript", "React", "Firebase", "Redux"],
    slug: "task-management-app",
    demoUrl: "https://example.com/tasks",
    githubUrl: "https://github.com/example/tasks",
    features: [
      "User authentication and account management",
      "Task creation with title, description, priority, and due date",
      "Drag-and-drop interface for status updates",
      "Categorization and tagging of tasks",
      "Task filtering and search functionality",
      "Due date notifications and reminders",
    ],
    featured: true,
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    description:
      "A fitness tracking application that allows users to record and analyze their workouts.",
    fullDescription:
      "This fitness tracking app enables users to record various types of workouts, track their progress over time, and set fitness goals. The app provides visualizations of workout data, allowing users to see improvements and identify areas for growth. Features include workout logging, progress tracking, goal setting, and social sharing.",
    image: "/project-placeholder-4.jpg",
    tags: ["React Native", "TypeScript", "Firebase", "Chart.js"],
    slug: "fitness-tracking-app",
    githubUrl: "https://github.com/example/fitness",
    features: [
      "Workout logging with exercise details",
      "Progress tracking over time",
      "Goal setting and achievement tracking",
      "Data visualization with charts and graphs",
      "Social sharing of achievements",
      "Workout recommendations based on history",
    ],
    featured: false,
  },
  {
    id: 5,
    title: "Recipe Sharing Platform",
    description:
      "A platform for food enthusiasts to discover, share, and save recipes.",
    fullDescription:
      "This recipe sharing platform allows users to discover new recipes, share their own creations, and build a collection of favorites. The platform includes features like recipe search, categorization by cuisine and dietary preferences, ingredient-based search, and social sharing. Users can create profiles, follow other cooks, and save recipes to their personal collections.",
    image: "/project-placeholder-5.jpg",
    tags: ["Vue.js", "Node.js", "MongoDB", "Vuetify"],
    slug: "recipe-sharing-platform",
    demoUrl: "https://example.com/recipes",
    githubUrl: "https://github.com/example/recipes",
    features: [
      "Recipe creation with ingredients and instructions",
      "Recipe search by title, ingredients, or cuisine",
      "Filtering by dietary preferences and cooking time",
      "User profiles and collections",
      "Social features including likes and comments",
      "Meal planning and grocery list generation",
    ],
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio Website Template",
    description:
      "A customizable portfolio website template for developers and designers.",
    fullDescription:
      "This portfolio website template provides developers and designers with a professional, customizable platform to showcase their work. Built with Next.js and styled with Tailwind CSS, the template includes sections for projects, skills, experience, and contact information. It's designed to be easy to modify and deploy, with a focus on performance, accessibility, and SEO.",
    image: "/project-placeholder-6.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    slug: "portfolio-website-template",
    demoUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/example/portfolio",
    features: [
      "Responsive design for all device sizes",
      "Customizable sections for projects, skills, and experience",
      "Contact form with validation",
      "Dark mode support",
      "SEO optimization",
      "Performance-focused implementation",
      "Smooth page transitions and animations",
    ],
    featured: false,
  },
];
