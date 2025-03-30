"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { siteConfig } from "@/data";
import { ReactNode } from "react";

interface ContactItem {
  icon: ReactNode;
  title: string;
  value: string;
  link: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
}

const ContactPage = () => {
  const contactInfo: ContactItem[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: siteConfig.email,
      link: `mailto:${siteConfig.email}`,
    },
  ];

  // Add phone only if it exists
  if (siteConfig.phone) {
    contactInfo.push({
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      value: siteConfig.phone,
      link: `tel:${siteConfig.phone.replace(/\D/g, "")}`,
    });
  }

  // Add location only if it exists
  if (siteConfig.location) {
    contactInfo.push({
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Location",
      value: siteConfig.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(
        siteConfig.location
      )}`,
    });
  }

  const socialLinks: SocialLink[] = [];

  // Add GitHub only if it exists
  if (siteConfig.socialLinks.github) {
    socialLinks.push({
      name: "GitHub",
      href: siteConfig.socialLinks.github,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    });
  }

  // Add LinkedIn only if it exists
  if (siteConfig.socialLinks.linkedin) {
    socialLinks.push({
      name: "LinkedIn",
      href: siteConfig.socialLinks.linkedin,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
    });
  }

  // Add Twitter only if it exists
  if (siteConfig.socialLinks.twitter) {
    socialLinks.push({
      name: "Twitter",
      href: siteConfig.socialLinks.twitter,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      ),
    });
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        variants={fadeInUp}
      >
        Get In Touch
      </motion.h1>
      <motion.p
        className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-16"
        variants={fadeInUp}
      >
        Have a question or want to work together? Feel free to reach out!
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div className="order-2 lg:order-1" variants={slideInLeft}>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <ContactForm />
        </motion.div>

        <motion.div className="order-1 lg:order-2" variants={slideInRight}>
          <motion.div
            className="card p-8 h-full"
            whileHover={{
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8 mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p>{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4">Connect on Social Media</h3>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-10 p-5 card bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-gray-700 dark:text-gray-300 italic">
                "I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your visions."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
