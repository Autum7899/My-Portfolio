// src/components/Contact.js
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Sending...');
        const form = event.target;
        const data = new FormData(form);

        try {
          const response = await fetch('/.netlify/functions/submit-message', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: data.get('name'),
                email: data.get('email'),
                message: data.get('message'),
              }),
          });

          if (response.ok) {
              setStatus('Thanks for your message!');
              form.reset();
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
        }
    };

    return(
        <AnimatedSection id="contact">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">I am actively looking for internship opportunities. If you have a role that you think would be a good fit, please get in touch!</p>
                </div>
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Your Name" required className="w-full bg-card border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                            <input type="email" name="email" placeholder="Your Email" required className="w-full bg-card border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
                        </div>
                        <div>
                            <textarea name="message" rows="5" placeholder="Your Message" required className="w-full bg-card border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg w-full md:w-auto">
                                Send Message
                            </button>
                        </div>
                        {status && <p className="text-center mt-4 text-muted-foreground">{status}</p>}
                    </form>
                </div>
            </div>
        </AnimatedSection>
    );
};
export default Contact;