import { Layers, Monitor, Server, Database, Wrench } from "lucide-react";

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Secre03"           },
  { label: "Gmail",  href: "mailto:markmilano112@gmail.com"       },
];

export const EDUCATION = [
  {
    school:    "Busay Elementary School",        
    address: "Busay, Daraga, Albay",
    year:    "2011 - 2016",
    logo:    "/assets/educ-background/elementary.jpg",
    desc:    "Completed primary education at Busay Elementary School, building a strong academic foundation in core subjects and developing early computer literacy skills.",
  },
  {
    school:    "Malabog National High School",
    address: "Salvacion, Daraga, Albay",
    year:    "2017 - 2023",
    logo:    "/assets/educ-background/highschool.jpg",  
    desc:    "Completed junior and senior high school education, developing critical thinking, discipline, and a growing interest in technology and programming.",
  },
  {
    school:    "Computer Arts Technological College Inc",
    address: "Legazpi City, Albay",                           
    year:    "2023 - present",
    logo:    "/assets/educ-background/catc.jpg",         
    desc:    "Currently pursuing a degree in Information Technology, gaining hands-on experience in web development, software engineering, and UI/UX design.",
  },
];

export const PROJECTS = [
  {
    num:       "01",
    title:     "Task Management System",
    role:      "Website",
    stack:     ["React", "Tailwind CSS", "PHP", "MySQL"],
    techIcons: ["react", "tailwindcss", "php", "mysql"],
    img:       "https://lauv-portfolio.vercel.app/_next/image?url=%2Fproj%2FprojectOne.png&w=1080&q=75",
    href:      "#",
  },
  {
    num:       "02",
    title:     "Path Finder",
    role:      "GUI Application",
    stack:     ["Python"],
    techIcons: ["python"],
    img:       "https://lauv-portfolio.vercel.app/_next/image?url=%2Fproj%2FprojectTwo.png&w=1080&q=75",
    href:      "#",
  },
  {
    num:       "03",
    title:     "Simple-Ecommerce",
    role:      "Website",
    stack:     ["HTML", "CSS", "Javascript", "Bootstrap"],
    techIcons: ["html5", "css3", "javascript", "bootstrap"],
    img:       "https://lauv-portfolio.vercel.app/_next/image?url=%2Fproj%2FprojectThree.png&w=1080&q=75",
    href:      "#",
  },
  {
    num:       "04",
    title:     "JMJ-Gadgets",
    role:      "Website",
    stack:     ["React", "Tailwind", "PHP", "MySQL", "Python"],
    techIcons: ["react", "tailwindcss", "php", "mysql", "python"],
    img:       "https://lauv-portfolio.vercel.app/_next/image?url=%2Fproj%2FprojectFour.png&w=1080&q=75",
    href:      "https://github.com/Secre03/JMJ-Gadgets",
  },
  {
    num:       "05",
    title:     "Zalora clone UI",
    role:      "Design",
    stack:     ["Figma"],
    techIcons: ["figma"],
    img:       "https://lauv-portfolio.vercel.app/_next/image?url=%2Fproj%2FprojectFive.png&w=1080&q=75",
    href:      "#",
  },
];

export const SKILLS = [
  {
    key:    "all",
    label:  "All",
    icon:   Layers,
    skills: [],
  },
  {
    key:   "frontend",
    label: "Frontend",
    icon:  Monitor,
    skills: [
      { name: "HTML",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"           },
      { name: "CSS",        image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"             },
      { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "React",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"           },
      { name: "shadcn/ui",  image: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4"                                  },
    ],
  },
  {
    key:   "backend",
    label: "Backend",
    icon:  Server,
    skills: [
      { name: "PHP",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"     },
    ],
  },
  {
    key:   "database",
    label: "Database",
    icon:  Database,
    skills: [
      { name: "MySQL",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"   },
    ],
  },
  {
    key:   "tools",
    label: "Tools",
    icon:  Wrench,
    skills: [
      { name: "VSCode", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Git",    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"       },
      { name: "GitHub", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Figma",  image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"   },
      { name: "Vite", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" }
    ],
  },
];