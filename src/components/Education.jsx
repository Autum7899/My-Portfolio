// src/components/Education.js
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { education } from '/src/data/portfolioData.jsx';

const Education = () => {
    return (
        <AnimatedSection id="education">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Education</h2>
                <div className="relative max-w-3xl mx-auto pl-12">
                    <div className="absolute left-0 top-0 h-full w-1 bg-slate-700"></div>
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            className="relative mb-12"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute -left-5 top-2 w-10 h-10 bg-slate-800 rounded-full border-4 border-indigo-500 flex items-center justify-center">
                                <GraduationCap className="text-white" size={20}/>
                            </div>
                            <div className="p-6 rounded-lg shadow-xl bg-slate-800">
                                <p className="text-indigo-400 font-semibold mb-1">{edu.date}</p>
                                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                <p className="text-lg text-gray-300">{edu.institution}</p>
                                <p className="text-gray-400 mb-3">Major: {edu.major}</p>
                                <p className="text-gray-300 text-sm">{edu.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Education;
