import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiX, FiCode, FiLayout, FiServer, FiDollarSign } from 'react-icons/fi';
import { CrudApp, CryptoInfoSearch, EmblaCarousel, PaymentGateway, InteractiveGallery, NFTStaking, ZKProofDemo } from './utils';
import TranslatedText from './utils/TranslatedText';
import walletVideo from '../assets/SC_3_209.webm';
import striderVideo from '../assets/Strider.webm';

// For Carousel Props
const OPTIONS = { dragFree: true, loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT)).map((_, index) => index);

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  details: string;
  video?: string;
  demo?: string;
  github?: string;
  component?: React.ComponentType<any>;
  componentProps?: any;
  isMobileVideo?: boolean;
}

interface Category {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  projects: Project[];
}

const categories: Category[] = [
  {
    id: 1,
    title: "Blockchain",
    icon: <FiCode className="w-8 h-8" />,
    description: "Development of blockchain solutions and decentralized applications",
    projects: [
      {
        id: 1,
        title: "Cross-Chain Wallet Module",
        description: "Interoperability module between different blockchains",
        technologies: ["Rust", "Solidity", "Web3", "Hardhat"],
        details: "Implementation of a wallet module that enables interaction between different blockchains, facilitating cross-chain transactions and digital asset management.",
        video: walletVideo,
        isMobileVideo: true
      },
      {
        id: 2,
        title: "NFT Staking Platform",
        description: "Interactive NFT staking simulation",
        technologies: ["React", "Smart Contracts", "DeFi"],
        details: "Interactive demonstration of NFT staking mechanics, including real-time rewards calculation, staking power, and transaction simulation.",
        component: NFTStaking
      },
      {
        id: 3,
        title: "Zero-Knowledge Proof Demo",
        description: "Interactive ZK proof simulation",
        technologies: ["React", "Cryptography", "ZK Proofs"],
        details: "Interactive demonstration of zero-knowledge proofs, showing how to prove knowledge of a value without revealing it.",
        component: ZKProofDemo
      }
    ]
  },
  {
    id: 2,
    title: "Backend",
    icon: <FiServer className="w-8 h-8" />,
    description: "Development of robust and scalable services and APIs",
    projects: [
      {
        id: 4,
        title: "Crypto Market Analysis",
        description: "Crypto market analysis tool with caching",
        technologies: ["React", "Node.js", "Redis"],
        details: "Cryptocurrency market analysis system with caching system to optimize performance and provide real-time data.",
        component: CryptoInfoSearch
      },
      {
        id: 5,
        title: "Database Fundamentals",
        description: "Interactive database management system",
        technologies: ["Node.js", "Express", "MongoDB"],
        details: "Application to demonstrate fundamental database operations, including CRUD and complex relationships.",
        component: CrudApp
      }
    ]
  },
  {
    id: 3,
    title: "Frontend",
    icon: <FiLayout className="w-8 h-8" />,
    description: "Development of modern and responsive interfaces",
    projects: [
      {
        id: 6,
        title: "Portfolio Website",
        description: "Personal website with modern design",
        technologies: ["React", "TypeScript", "Tailwind"],
        details: "Personal portfolio with dark mode, smooth animations, and responsive design, built with the latest web technologies."
      },
      {
        id: 7,
        title: "Interactive Gallery",
        description: "Dynamic content showcase",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        details: "Modern gallery with grid/list views, theme switching, real-time search, and category filtering.",
        component: EmblaCarousel,
        componentProps: { slides: SLIDES, options: OPTIONS }
      },
      {
        id: 8,
        title: "Rust Simulator WebServer",
        description: "Web server implemented with Rust and Rocket",
        technologies: ["Rust", "Rocket", "PostgreSQL"],
        details: "High-performance web server built with Rust and the Rocket framework, optimized for maximum efficiency and security.",
        component: InteractiveGallery
      }
    ]
  },
  {
    id: 4,
    title: "Financial",
    icon: <FiDollarSign className="w-8 h-8" />,
    description: "Integration of payment systems and financial services",
    projects: [
      {
        id: 9,
        title: "Stride Credit Card Payment",
        description: "Payment processing system",
        technologies: ["Node.js", "Stripe", "Express"],
        details: "Credit card payment integration using Stripe, including subscription handling and recurring payments.",
        video: striderVideo,
        isMobileVideo: true
      },
      {
        id: 10,
        title: "Payment Gateway Demo",
        description: "Interactive payment processing interface",
        technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
        details: "Modern payment interface with multi-step form, real-time validation, and smooth animations. Demonstrates secure payment processing flow with credit card input and order summary.",
        component: PaymentGateway
      }
    ]
  }
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const scrollToCategory = (categoryId: number) => {
    if (window.innerWidth < 768) { // Solo en móvil
      const ref = categoryRefs.current[categoryId];
      if (ref) {
        // Esperar a que el DOM se actualice con los proyectos expandidos
        setTimeout(() => {
          const headerOffset = 100; // Altura del header + espacio extra
          const elementPosition = ref.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 200); // Mayor delay para asegurar que los proyectos se han expandido
      }
    }
  };

  const handleCategoryClick = (category: Category) => {
    const newCategory = selectedCategory?.id === category.id ? null : category;
    setSelectedCategory(newCategory);
    if (newCategory) {
      scrollToCategory(newCategory.id);
    }
  };
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const closeProject = () => {
    document.body.style.overflow = 'auto';
    setSelectedProject(null);
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      key={refreshKey}
      id="work"
      ref={ref}
      className="relative py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              <TranslatedText text="My Projects" />
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <TranslatedText text="A selection of projects that demonstrate my skills in different areas of software development." />
            </p>
          </motion.div>

          {/* Desktop View */}
          <div className="hidden md:block">
            {/* Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 ${
                    selectedCategory?.id === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  ref={(el) => categoryRefs.current[category.id] = el}
                  onClick={() => handleCategoryClick(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <TranslatedText text={category.description} />
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Desktop Projects Grid */}
            {selectedCategory && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedCategory.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Project content */}
                    {project.video ? (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-white text-xl font-bold">
                            <TranslatedText text={project.title} />
                          </h3>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-lg font-medium">
                            <TranslatedText text="View Details" />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-white text-xl font-bold">
                            <TranslatedText text={project.title} />
                          </h3>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-lg font-medium">
                            <TranslatedText text="View Details" />
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        <TranslatedText text={project.title} />
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        <TranslatedText text={project.description} />
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                {/* Category Card */}
                <motion.div
                  variants={itemVariants}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 ${
                    selectedCategory?.id === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  ref={(el) => categoryRefs.current[category.id] = el}
                  onClick={() => handleCategoryClick(category)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-blue-600 dark:text-blue-400">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <TranslatedText text={category.description} />
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Projects */}
                {selectedCategory?.id === category.id && (
                  <div className="space-y-4">
                    {category.projects.map((project) => (
                      <motion.div
                        key={project.id}
                        variants={itemVariants}
                        className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ y: -5 }}
                      >
                        {project.video ? (
                          <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h3 className="text-white text-xl font-bold">
                                <TranslatedText text={project.title} />
                              </h3>
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-lg font-medium">
                                <TranslatedText text="View Details" />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h3 className="text-white text-xl font-bold">
                                <TranslatedText text={project.title} />
                              </h3>
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-lg font-medium">
                                <TranslatedText text="View Details" />
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            <TranslatedText text={project.title} />
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            <TranslatedText text={project.description} />
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full h-[95vh] md:h-auto overflow-y-auto overscroll-behavior-y-contain mx-2 md:mx-6 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative">
                {selectedProject.video ? (
                  <div className="relative bg-black h-[80vh] flex items-center justify-center">
                    <div className={selectedProject.isMobileVideo ? 'h-full w-[40%]' : 'h-full w-full'}>
                      <video
                        className="h-full w-full object-contain"
                        autoPlay
                        loop
                        muted
                        controls
                        playsInline
                      >
                        <source src={selectedProject.video} type="video/webm" />
                      </video>
                    </div>
                  </div>
                ) : selectedProject.component && (
                  <div className="h-[80vh] bg-gray-100 dark:bg-gray-700">
                    <selectedProject.component {...selectedProject.componentProps} />
                  </div>
                )}
                <button
                  onClick={closeProject}
                  className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 backdrop-blur-sm text-white hover:bg-black/90 transition-colors shadow-lg"
                >
                  <FiX size={28} />
                </button>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  <TranslatedText text={selectedProject.title} />
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <TranslatedText text={selectedProject.details} />
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <FiGithub size={20} />
                      <TranslatedText text="View Code" />
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <FiExternalLink size={20} />
                      <TranslatedText text="Live Demo" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;