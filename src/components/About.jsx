// src/components/About.js
import React from "react";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  return (
    <AnimatedSection id="about">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-lg transform -rotate-3"></div>
              <img
                src="https://placehold.co/600x600/1a202c/a3bffa?text=Profile+Pic"
                alt="About Minh Sơn"
                className="rounded-lg shadow-2xl w-full relative transform hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="md:col-span-3 text-lg text-muted-foreground space-y-6">
            <p>
              Hello! I'm Sơn, a third-year Computer Science student with a deep
              passion for technology and a specialization in Information
              Systems. My academic journey has equipped me with a solid
              foundation in software development, database design, and system
              analysis.
            </p>
            <p>
              I am driven by the challenge of turning complex requirements into
              simple, elegant, and efficient software solutions. I have hands-on
              experience with a variety of modern technologies and I am always
              eager to learn more and expand my skill set through personal
              projects and coursework.
            </p>
            <p>
              I am actively seeking internship opportunities where I can
              contribute my skills, learn from experienced professionals, and
              tackle real-world challenges.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
export default About;