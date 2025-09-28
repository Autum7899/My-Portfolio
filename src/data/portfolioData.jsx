// src/data/portfolioData.js

export const user = {
  name: "Minh Sơn",
  title: "Information Systems Student & Aspiring Developer",
  location: "Hanoi, Vietnam",
  bio: "A third-year Computer Science student specializing in Information Systems. Passionate about building robust applications and solving complex problems with code.",
  profileImage: "https://placehold.co/150x150/1e293b/a5b4fc?text=LMS",
  socials: {
    github: "https://github.com/Autum7899",
    linkedin: "https://www.linkedin.com/in/sơn-minh-3837a8370/",
    twitter: "#",
    facebook: "https://www.facebook.com/Autum83/",
  },
  email: "minhson789999@gmail.com",
};

export const education = [
  {
    institution: "University of Economics - Technology for Industries", // <-- TODO: Add your university name
    degree: "Engineering degree in Information Technology",
    major: "Information Systems",
    date: "Expected Graduation: 2026",
    description:
      "Focusing on database management, system analysis, and full-stack web development. Consistently maintaining a high GPA through challenging coursework and practical projects.",
  },
];

export const projects = [
  {
    title: "University Web Project",
    description:
      "A comprehensive university project focused on database management and web interfaces, built with React and SQL.",
    image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+1",
    tags: ["React", "SQL Server", "Express"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Personal .NET App",
    description:
      "An personal learning project to explore backend development using C# and the .NET framework.",
    image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+2",
    tags: ["C#", ".NET", "MySQL"],
    demo: "#",
    repo: "#",
  },
  {
    title: "Next.js Portfolio",
    description:
      "A personal portfolio website (like this one) built to showcase skills and projects, using Next.js for performance.",
    image: "https://placehold.co/600x400/1e293b/a5b4fc?text=Project+3",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    demo: "#",
    repo: "#",
  },
];

export const skills = {
  frontend: [
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      level: "Advanced"
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      level: "Advanced"
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      level: "Advanced"
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: "Intermediate"
    },
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: "Advanced"
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      invert: true,
      level: "Intermediate"
    },
    {
      name: "Vue.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      level: "Learning"
    },
    {
      name: "Tailwind CSS",
      logo: "/Tailwind CSS.svg",
      level: "Advanced"
    },
    {
      name: "SASS/SCSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      level: "Intermediate"
    },
    {
      name: "Bootstrap",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      level: "Intermediate"
    }
  ],
  backend: [
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: "Advanced"
    },
    {
      name: "Express.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      invert: true,
      level: "Advanced"
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      level: "Intermediate"
    },
    {
      name: "Spring Boot",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      level: "Learning"
    },
    {
      name: "C#",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      level: "Intermediate"
    },
    {
      name: ".NET",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
      level: "Intermediate"
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      level: "Learning"
    },
    {
      name: "Django",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      level: "Learning"
    },
    {
      name: "FastAPI",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      level: "Learning"
    },
    {
      name: "PHP",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      level: "Learning"
    },
    {
      name: "Laravel",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      level: "Learning"
    }
  ],
  database: [
    {
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      level: "Advanced"
    },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      level: "Intermediate"
    },
    {
      name: "SQL Server",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
      level: "Intermediate"
    },
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      level: "Learning"
    },
    {
      name: "Redis",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      level: "Learning"
    },
    {
      name: "Firebase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      level: "Learning"
    }
  ],
  cloudDevOps: [
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      level: "Intermediate"
    },
    {
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      level: "Learning"
    },
    {
      name: "Azure",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      level: "Learning"
    },
    {
      name: "Google Cloud",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      level: "Learning"
    },
    {
      name: "Kubernetes",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
      level: "Learning"
    },
    {
      name: "GitHub Actions",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      level: "Learning"
    },
    {
      name: "Jenkins",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      level: "Learning"
    }
  ],
  tools: [
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      level: "Advanced"
    },
    {
      name: "GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      level: "Advanced"
    },
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      level: "Intermediate"
    },
    {
      name: "Postman",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      level: "Intermediate"
    },
    {
      name: "Jira",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      level: "Learning"
    },
    {
      name: "Slack",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
      level: "Learning"
    }
  ]
};
