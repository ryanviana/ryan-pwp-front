"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    const errors = {
      name: "",
      email: "",
      message: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (name: string) => {
    setFocusedField(name);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setFormStatus("success");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-3 sm:space-y-6 w-full max-w-2xl mx-auto relative"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 opacity-5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>

      <AnimatePresence>
        {formStatus === "success" && (
          <motion.div
            className="card border border-green-500 text-green-800 dark:text-green-300 p-3 sm:p-4 rounded-lg text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="flex items-center">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 5] }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </motion.svg>
              <span>
                Thank you! Your message has been sent to
                ryan.viana@grupoprisma.tech
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {formStatus === "error" && (
          <motion.div
            className="card border border-red-500 text-red-800 dark:text-red-300 p-3 sm:p-4 rounded-lg text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="flex items-center">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 5] }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </motion.svg>
              <span>
                Failed to send your message. Please try again or contact
                directly at ryan.viana@grupoprisma.tech
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="relative" variants={fadeInUp}>
        <label
          htmlFor="name"
          className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
            focusedField === "name" || formData.name
              ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-blue-600 z-10"
              : "top-3 text-gray-500"
          }`}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => handleFocus("name")}
          onBlur={handleBlur}
          className={`w-full px-3 pt-3 pb-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 bg-transparent ${
            formErrors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {formErrors.name && (
          <motion.p
            className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formErrors.name}
          </motion.p>
        )}
      </motion.div>

      <motion.div className="relative" variants={fadeInUp}>
        <label
          htmlFor="email"
          className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
            focusedField === "email" || formData.email
              ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-blue-600 z-10"
              : "top-3 text-gray-500"
          }`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          className={`w-full px-3 pt-3 pb-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 bg-transparent ${
            formErrors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {formErrors.email && (
          <motion.p
            className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formErrors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div className="relative" variants={fadeInUp}>
        <label
          htmlFor="subject"
          className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
            focusedField === "subject" || formData.subject
              ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-blue-600 z-10"
              : "top-3 text-gray-500"
          }`}
        >
          Subject (Optional)
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => handleFocus("subject")}
          onBlur={handleBlur}
          className="w-full px-3 pt-3 pb-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 bg-transparent"
        />
      </motion.div>

      <motion.div className="relative" variants={fadeInUp}>
        <label
          htmlFor="message"
          className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
            focusedField === "message" || formData.message
              ? "-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-blue-600 z-10"
              : "top-3 text-gray-500"
          }`}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleFocus("message")}
          onBlur={handleBlur}
          className={`w-full px-3 pt-3 pb-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 bg-transparent resize-none ${
            formErrors.message
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        ></textarea>
        {formErrors.message && (
          <motion.p
            className="mt-1 text-xs text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formErrors.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        className="flex justify-center sm:justify-end"
        variants={fadeInUp}
      >
        <motion.button
          type="submit"
          disabled={formStatus === "submitting"}
          className="w-full sm:w-auto btn btn-primary px-6 py-2 sm:py-3 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {formStatus === "submitting" ? (
            <>
              <motion.svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </motion.svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 5] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.75,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
