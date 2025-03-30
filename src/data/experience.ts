export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  location?: string;
  description?: string;
}

export const workExperiences: WorkExperience[] = [
  {
    id: 1,
    title: "Cofundador",
    company: "Prisma Tech",
    location: "São Carlos, São Paulo, Brazil",
    startDate: "January 2024",
    endDate: "Present",
    description: [
      "Co-founded a technology startup focused on developing innovative software solutions",
      "Leading the development of AI-powered tools for the Brazilian market",
      "Recently pivoted from the education sector to building an AI-driven SDR solution",
      "Implementing integrations with WhatsApp and other communication channels",
    ],
  },
  {
    id: 2,
    title: "Software Development Intern",
    company: "EloGroup",
    location: "Remote",
    startDate: "March 2022",
    endDate: "December 2023",
    description: [
      "Led backend development for a major application at the Secretary of Treasury of Ceará using Java Spring Boot and PostgreSQL",
      "Collaborated with multidisciplinary teams across business, data engineering, and technology",
      "Developed robust and scalable digital solutions for the government sector",
      "Implemented RESTful APIs and integrated with various data sources",
    ],
  },
  {
    id: 3,
    title: "Summer Internship",
    company: "EloGroup",
    startDate: "January 2022",
    endDate: "February 2022",
    description: [
      "Performed Business Process Transformation activities including mapping business processes and identifying pain points",
      "Used Microsoft Office tools and Bizagi for process modeling",
      "Received training in consulting skills like storytelling and client communication",
    ],
  },
  {
    id: 4,
    title: "Team Manager",
    company: "Centro Acadêmico Armando de Salles Oliveira - CAASO",
    startDate: "September 2021",
    endDate: "March 2022",
    description: [
      "Managed a five-person team at CAASO Idiomas, a non-profit language school",
      "Directed projects to improve class quality and increase student and teacher numbers",
      "Established a scholarship program offering 50-100% discounts for socioeconomically vulnerable individuals",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "1st Place | Zencon Hackathon 2023",
    organization: "Zencon",
    date: "September 2023",
    description:
      "1st place achievement at ZENCON ($20,000) in the ZENIQ Evolution category, developing an innovative blockchain application on the ZENIQ Smart Chain.",
  },
  {
    id: 2,
    title: "1st Place | Digital Bootcamp 2021",
    organization: "EloGroup",
    date: "October 2021",
    description:
      "Participated in the Technology frame of EloGroup Digital Bootcamp, consuming over 40 hours of content on Cloud Native Development, Software Engineering, and RPA before solving a real case problem in a team.",
  },
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Computer Engineering",
    institution: "Universidade de São Paulo",
    startYear: "2020",
    endYear: "2024",
  },
];
