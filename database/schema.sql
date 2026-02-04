-- Portfolio Database Schema for Neon PostgreSQL
-- Run this script in your Neon database console

-- User/Profile table
CREATE TABLE IF NOT EXISTS portfolio_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(500),
    location VARCHAR(255),
    bio TEXT,
    profile_image TEXT,
    email VARCHAR(255),
    github VARCHAR(500),
    linkedin VARCHAR(500),
    twitter VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Education table
CREATE TABLE IF NOT EXISTS portfolio_education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(500) NOT NULL,
    degree VARCHAR(255),
    major VARCHAR(255),
    date VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    tags TEXT[] DEFAULT '{}',
    demo VARCHAR(500),
    repo VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS portfolio_skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    level VARCHAR(50) DEFAULT 'Intermediate',
    invert BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table (already exists, but included for completeness)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default user data
INSERT INTO portfolio_user (name, title, location, bio, profile_image, email, github, linkedin, twitter)
VALUES (
    'Minh Sơn',
    'Information Systems Student & Aspiring Developer',
    'Hanoi, Vietnam',
    'A third-year Computer Science student specializing in Information Systems. Passionate about building robust applications and solving complex problems with code.',
    'https://placehold.co/150x150/1e293b/a5b4fc?text=LMS',
    'minhson789999@gmail.com',
    'https://github.com/Autum7899',
    'https://www.linkedin.com/in/sơn-minh-3837a8370/',
    '#'
) ON CONFLICT DO NOTHING;

-- Insert default education
INSERT INTO portfolio_education (institution, degree, major, date, description)
VALUES (
    'University of Economics - Technology for Industries',
    'Engineering degree in Information Technology',
    'Information Systems',
    'Expected Graduation: 2026',
    'Focusing on database management, system analysis, and full-stack web development. Consistently maintaining a high GPA through challenging coursework and practical projects.'
) ON CONFLICT DO NOTHING;

-- Insert default projects
INSERT INTO portfolio_projects (title, description, image, tags, demo, repo) VALUES
('University Web Project', 'A comprehensive university project focused on database management and web interfaces, built with React and SQL.', 'https://placehold.co/600x400/1e293b/a5b4fc?text=Project+1', ARRAY['React', 'SQL Server', 'Express'], '#', '#'),
('Personal .NET App', 'An personal learning project to explore backend development using C# and the .NET framework.', 'https://placehold.co/600x400/1e293b/a5b4fc?text=Project+2', ARRAY['C#', '.NET', 'MySQL'], '#', '#'),
('Next.js Portfolio', 'A personal portfolio website (like this one) built to showcase skills and projects, using Next.js for performance.', 'https://placehold.co/600x400/1e293b/a5b4fc?text=Project+3', ARRAY['Next.js', 'TypeScript', 'Tailwind'], '#', '#')
ON CONFLICT DO NOTHING;

-- Insert default skills
INSERT INTO portfolio_skills (category, name, logo, level, invert) VALUES
-- Frontend
('frontend', 'HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'Advanced', false),
('frontend', 'CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'Advanced', false),
('frontend', 'JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'Advanced', false),
('frontend', 'TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'Intermediate', false),
('frontend', 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Advanced', false),
('frontend', 'Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', 'Intermediate', true),
('frontend', 'Vue.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', 'Learning', false),
('frontend', 'Tailwind CSS', '/Tailwind CSS.svg', 'Advanced', false),
-- Backend
('backend', 'Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'Advanced', false),
('backend', 'Express.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 'Advanced', true),
('backend', 'Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Intermediate', false),
('backend', 'C#', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', 'Intermediate', false),
('backend', '.NET', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', 'Intermediate', false),
('backend', 'Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'Learning', false),
-- Database
('database', 'MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'Advanced', false),
('database', 'PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'Intermediate', false),
('database', 'SQL Server', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', 'Intermediate', false),
('database', 'MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 'Learning', false),
-- Cloud & DevOps
('cloudDevOps', 'Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'Intermediate', false),
('cloudDevOps', 'AWS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', 'Learning', false),
('cloudDevOps', 'Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'Advanced', false),
-- Tools
('tools', 'GitHub', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'Advanced', false),
('tools', 'Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 'Intermediate', false),
('tools', 'Postman', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', 'Intermediate', false)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON portfolio_skills(category);
CREATE INDEX IF NOT EXISTS idx_projects_created ON portfolio_projects(created_at DESC);
