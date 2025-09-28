// src/components/Contact.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { user } from '/src/data/portfolioData.jsx';

const Contact = () => {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        } else if (formData.message.trim().length > 1000) {
            newErrors.message = 'Message must be less than 1000 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setStatus('Sending...');

        try {
          const response = await fetch('/.netlify/functions/submit-message', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              setStatus('Thanks for your message! I\'ll get back to you soon.');
              setFormData({ name: '', email: '', message: '' });
              setErrors({});
          } else {
              const responseData = await response.json();
              if (responseData.errors) {
                  setStatus(responseData.errors.map(error => error.message).join(", "));
              } else {
                  setStatus('Oops! There was a problem submitting your form.');
              }
          }
        } catch (error) {
            setStatus('Oops! There was a problem submitting your form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: user.email, href: `mailto:${user.email}` },
        { icon: Phone, label: 'Phone', value: '0334403206', href: 'tel:0334403206' },
        { icon: MapPin, label: 'Location', value: user.location, href: '#' }
    ];

    return(
        <AnimatedSection id="contact">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative"
                >
                    {/* Enhanced Title with Liquid Glass */}
                    <motion.div 
                        className="relative mb-16"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-center text-foreground relative z-10"
                        >
                            Let's Connect
                        </motion.h2>
                        {/* Liquid Glass background for title */}
                        <motion.div 
                            className="absolute inset-0 -m-4 liquid-glass rounded-2xl"
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        />
                    </motion.div>
                    
                    {/* Description */}
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <motion.p 
                            className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            I'm actively seeking internship opportunities and exciting projects. 
                            Whether you have a role that fits my skills or just want to chat about technology, 
                            I'd love to hear from you!
                        </motion.p>

                        <motion.div
                            className="w-24 h-1 liquid-glass mx-auto rounded-full"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Information */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h3>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    Ready to collaborate or discuss opportunities? I'm always excited to connect 
                                    with fellow developers, potential employers, or anyone interested in technology!
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        href={info.href}
                                        className="flex items-center space-x-4 p-4 rounded-xl liquid-glass-card liquid-glass-hover transition-all duration-300 group"
                                        whileHover={{ scale: 1.02, x: 10 }}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <motion.div
                                            className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <info.icon size={20} className="text-primary" />
                                        </motion.div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{info.label}</p>
                                            <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                                                {info.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Social Links */}
                            <motion.div
                                className="pt-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <h4 className="text-lg font-semibold text-foreground mb-4">Follow Me</h4>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: 'GitHub', href: user.socials.github, color: 'hover:text-gray-400' },
                                        { icon: 'LinkedIn', href: user.socials.linkedin, color: 'hover:text-blue-600' }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            className={`text-muted-foreground ${social.color} transition-all duration-300`}
                                            whileHover={{ scale: 1.2, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="relative liquid-glass-card rounded-2xl p-8 shadow-2xl border border-primary/20">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center">
                                            <Send size={24} className="text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground">Send Me a Message</h3>
                                    </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <input 
                                                type="text" 
                                                name="name" 
                                                placeholder="Your Name" 
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full liquid-glass-card border-2 rounded-xl px-4 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                                                    errors.name ? 'border-red-500 dark:border-red-400' : 'border-primary/20'
                                                }`}
                                            />
                                            {errors.name && (
                                                <motion.p 
                                                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                        
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <input 
                                                type="email" 
                                                name="email" 
                                                placeholder="Your Email" 
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full liquid-glass-card border-2 rounded-xl px-4 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                                                    errors.email ? 'border-red-500 dark:border-red-400' : 'border-primary/20'
                                                }`}
                                            />
                                            {errors.email && (
                                                <motion.p 
                                                    className="text-red-500 dark:text-red-400 text-sm mt-1"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {errors.email}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    </div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="relative">
                                            <textarea 
                                                name="message" 
                                                rows="5" 
                                                placeholder="Your Message" 
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className={`w-full liquid-glass-card border-2 rounded-xl px-4 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none ${
                                                    errors.message ? 'border-red-500 dark:border-red-400' : 'border-primary/20'
                                                }`}
                                            />
                                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                                                {formData.message.length}/1000
                                            </div>
                                        </div>
                                        {errors.message && (
                                            <motion.p 
                                                className="text-red-500 text-sm mt-1"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.message}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <motion.button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="liquid-glass text-black dark:text-white font-semibold px-8 py-4 rounded-xl hover:liquid-glass-hover transition-all duration-300 shadow-xl w-full md:w-auto relative overflow-hidden group border-2 border-primary/30"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <motion.span
                                                className="flex items-center justify-center gap-2"
                                                animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        Send Message
                                                    </>
                                                )}
                                            </motion.span>
                                            
                                            {/* Ripple Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-white/20 rounded-lg"
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileHover={{
                                                    scale: [0, 1.5],
                                                    opacity: [0, 0.3, 0]
                                                }}
                                                transition={{ duration: 0.6 }}
                                            />
                                        </motion.button>
                                    </motion.div>
                                    
                                    {status && (
                                        <motion.div 
                                            className={`text-center p-4 rounded-lg ${
                                                status.includes('Thanks') 
                                                    ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                                                    : 'bg-red-500/10 text-red-600 border border-red-500/20'
                                            }`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {status.includes('Thanks') ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <AlertCircle className="w-5 h-5" />
                                                )}
                                                <span>{status}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatedSection>
    );
};
export default Contact;