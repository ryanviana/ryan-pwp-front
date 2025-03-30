"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItemVariants, staggerContainer } from "@/lib/animations";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-900 shadow-md py-2"
          : "bg-white dark:bg-gray-900 py-3 md:py-4 border-b border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold relative group">
          <motion.span
            className="animated-gradient-text text-xl md:text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            Ryan
          </motion.span>
        </Link>

        {/* Mobile menu button - larger touch target */}
        <motion.button
          className="md:hidden flex items-center justify-center h-12 w-12 -mr-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative flex justify-center items-center w-8 h-6">
            <span
              className={`absolute block h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute block h-0.5 w-8 bg-current transform transition duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45" : "translate-y-2"
              }`}
            ></span>
          </div>
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul
            className="flex space-x-6 lg:space-x-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.path}
                variants={navItemVariants}
                custom={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.path}
                  className="relative py-2 px-1 font-medium transition-colors hover:text-blue-600"
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-gradient-to-r from-blue-600 to-purple-600"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-[280px] bg-white dark:bg-gray-900 shadow-xl md:hidden flex flex-col h-full border-l dark:border-gray-800"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
              <div className="text-lg font-bold animated-gradient-text">
                Menu
              </div>
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-2xl"
                aria-label="Close menu"
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>

            <div className="py-6 px-5 flex-grow">
              <nav>
                <motion.ul
                  className="flex flex-col gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      variants={navItemVariants}
                      custom={index}
                      whileTap={{ scale: 0.97 }}
                      className="w-full"
                    >
                      <Link
                        href={item.path}
                        className={`block w-full py-4 px-5 rounded-lg transition-all duration-300 text-base font-medium ${
                          pathname === item.path
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </div>

            <div className="mt-auto p-5 text-sm text-center text-gray-500 border-t border-gray-200 dark:border-gray-800">
              <p>© {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
