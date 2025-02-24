import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TranslatedText from './utils/TranslatedText';
import TechIcons from './utils/TechIcons';

interface Expertise {
  category: string;
  skills: string[];
  techs: string[];
}

const skillCardVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const expertise: Expertise[] = [
  {
    category: "Blockchain & Web3",
    skills: [],
    techs: [
      'Smart Contracts', 'Upgradeable', 'MEV Protection',
      'Optimism', 'Layer 2', 'Zero Knowledge', 'Cross-chain',
      'DeFi', 'Rollups', 'Ethereum', 'Bridges', 'Solana',
      'Solidity', 'Web3', 'Oracles'
    ]
  },
  {
    category: "Backend Architecture",
    skills: [],
    techs: [
      'Rust', 'Distributed Systems', 'Serverless',
      'Cloud Native', 'Microservices', 'AWS',
      'High-Performance', 'PostgreSQL', 'MongoDB',
      'Redis', 'GraphQL', 'Node.js',
      'APIs', 'Docker', 'Kubernetes'
    ]
  },
  {
    category: "Modern Stack",
    skills: [],
    techs: [
      'React', 'TypeScript', 'Node.js', 'Express',
      'Testing', 'Jest', 'CI/CD', 'RESTful',
      'TailwindCSS', 'Next.js', 'Vite', 'Flutter',
      'Git', 'GitHub', 'Postman'
    ]
  }
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section
      id="skills"
      ref={ref}
      className="pt-16 sm:pt-24 pb-4 sm:pb-8 -mt-16 bg-gradient-to-b from-blue-50/20 via-white to-white dark:from-gray-800/30 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="mb-6 sm:mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                <TranslatedText text="Education & Skills" />
              </h2>
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden bg-[url('/diploma-bg.png')] bg-cover bg-center rounded-xl p-6 sm:p-10 shadow-xl mb-6 sm:mb-12"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/90 to-cyan-50/90 dark:from-blue-900/90 dark:via-gray-800/90 dark:to-cyan-900/90" />
                <div className="absolute inset-0 border-[12px] border-double border-blue-200/20 dark:border-blue-700/20 rounded-lg" />
                <div className="absolute inset-[3px] border-2 border-blue-200/20 dark:border-blue-700/20 rounded-lg" />
                
                <div className="relative">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4 sm:mb-6"
                  >
                    <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-1 sm:mb-2 font-semibold">
                      Degree in
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300 mb-1">
                      Software Engineering
                    </h3>
                    <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mt-1 sm:mt-2 font-semibold">
                      from
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    <p className="text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 font-medium">
                      La Salle University Colombia
                    </p>
                  </motion.div>
                </div>

                {/* Sello */}
                <div className="absolute -right-4 sm:-right-6 -bottom-4 sm:-bottom-6 w-16 sm:w-24 h-16 sm:h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border-4 border-purple-500/20 animate-[spin_15s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border-4 border-cyan-500/20 animate-[spin_20s_linear_infinite]" />
                </div>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300"
              >
                <TranslatedText text="Technical Expertise" />
              </motion.h3>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
            >
              {expertise.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={skillCardVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden bg-gradient-to-br p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border backdrop-blur-sm ${
                    index === 0
                      ? "from-purple-500/5 via-white to-purple-500/5 dark:from-purple-900/20 dark:via-gray-800 dark:to-purple-900/20 border-purple-200/20 dark:border-purple-700/20"
                      : index === 1
                        ? "from-blue-500/5 via-white to-blue-500/5 dark:from-blue-900/20 dark:via-gray-800 dark:to-blue-900/20 border-blue-200/20 dark:border-blue-700/20"
                        : "from-cyan-500/5 via-white to-cyan-500/5 dark:from-cyan-900/20 dark:via-gray-800 dark:to-cyan-900/20 border-cyan-200/20 dark:border-cyan-700/20"
                  }`}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                  <div className={`absolute inset-0 bg-gradient-to-r rounded-xl ${
                    index === 0
                      ? "from-purple-500/10 via-transparent to-purple-500/10 dark:from-purple-400/10 dark:to-purple-400/10"
                      : index === 1
                        ? "from-blue-500/10 via-transparent to-blue-500/10 dark:from-blue-400/10 dark:to-blue-400/10"
                        : "from-cyan-500/10 via-transparent to-cyan-500/10 dark:from-cyan-400/10 dark:to-cyan-400/10"
                  }`} />
                  <div className={`absolute -inset-1 bg-gradient-to-r blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 ${
                    index === 0
                      ? "from-purple-500/20 via-transparent to-purple-500/20"
                      : index === 1
                        ? "from-blue-500/20 via-transparent to-blue-500/20"
                        : "from-cyan-500/20 via-transparent to-cyan-500/20"
                  }`} />
                  <div className={`absolute inset-0 ${
                    index === 0
                      ? "bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent_70%)]"
                      : index === 1
                        ? "bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent_70%)]"
                        : "bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.1),transparent_70%)]"
                  }`} />
                  <div className={`absolute inset-0 ${
                    index === 0
                      ? "bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.1),transparent_50%)]"
                      : index === 1
                        ? "bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"
                        : "bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_50%)]"
                  }`} />
                  
                  <div className="relative">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative mb-8 text-center"
                    >
                      <h3 className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                        index === 0
                          ? "from-purple-600 via-purple-500 to-fuchsia-500 dark:from-purple-400 dark:via-purple-300 dark:to-fuchsia-300"
                          : index === 1
                            ? "from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-300"
                            : "from-cyan-600 via-cyan-500 to-teal-500 dark:from-cyan-400 dark:via-cyan-300 dark:to-teal-300"
                      }`}>
                        <TranslatedText text={exp.category} />
                      </h3>
                      <div className={`absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r ${
                        index === 0
                          ? "from-purple-500/0 via-purple-500/50 to-purple-500/0 dark:from-purple-400/0 dark:via-purple-400/50 dark:to-purple-400/0"
                          : index === 1
                            ? "from-blue-500/0 via-blue-500/50 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/50 dark:to-blue-400/0"
                            : "from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/50 dark:to-cyan-400/0"
                      }`} />
                      <div className={`absolute -bottom-2 left-[10%] right-[10%] h-px bg-gradient-to-r ${
                        index === 0
                          ? "from-fuchsia-500/0 via-fuchsia-500/30 to-fuchsia-500/0 dark:from-fuchsia-400/0 dark:via-fuchsia-400/30 dark:to-fuchsia-400/0"
                          : index === 1
                            ? "from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 dark:from-cyan-400/0 dark:via-cyan-400/30 dark:to-cyan-400/0"
                            : "from-teal-500/0 via-teal-500/30 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/30 dark:to-teal-400/0"
                      }`} />
                    </motion.div>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:gap-x-6 sm:gap-y-12 justify-items-center mx-auto max-w-[95%] sm:max-w-[90%]">
                      {exp.techs.map((tech, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="group relative flex flex-col items-center justify-center w-[3.5rem] h-[3.5rem] sm:w-[4.5rem] sm:h-[4.5rem] transition-all duration-500 hover:scale-110"
                        >
                          <div 
                            className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
                              index === 0 
                                ? "from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800 group-hover:from-purple-100 group-hover:to-purple-50 dark:group-hover:from-purple-800/30 dark:group-hover:to-gray-700"
                              : index === 1
                                ? "from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800 group-hover:from-blue-100 group-hover:to-blue-50 dark:group-hover:from-blue-800/30 dark:group-hover:to-gray-700"
                                : "from-cyan-50 to-white dark:from-cyan-900/30 dark:to-gray-800 group-hover:from-cyan-100 group-hover:to-cyan-50 dark:group-hover:from-cyan-800/30 dark:group-hover:to-gray-700"
                            }`}
                            style={{
                              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                              boxShadow: `0 4px 15px ${
                                index === 0 
                                  ? 'rgba(139, 92, 246, 0.1)' // Purple
                                  : index === 1
                                    ? 'rgba(59, 130, 246, 0.1)' // Blue
                                    : 'rgba(6, 182, 212, 0.1)' // Cyan
                              }`
                            }}
                          />
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(45deg, transparent 65%, ${
                                index === 0 
                                  ? 'rgba(139, 92, 246, 0.3)' // Purple
                                  : index === 1
                                    ? 'rgba(59, 130, 246, 0.3)' // Blue
                                    : 'rgba(6, 182, 212, 0.3)' // Cyan
                              } 67%, ${
                                index === 0 
                                  ? 'rgba(139, 92, 246, 0.4)' // Purple
                                  : index === 1
                                    ? 'rgba(59, 130, 246, 0.4)' // Blue
                                    : 'rgba(6, 182, 212, 0.4)' // Cyan
                              } 70%, transparent 75%)`,
                              animation: 'shine 2s ease-in-out infinite',
                              backgroundSize: '200% 100%',
                              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                            }}
                          />
                          <div className="relative z-10">
                            <TechIcons 
                              techs={[tech]} 
                              color={
                                index === 0 ? "#8B5CF6" :  // Blockchain - Purple
                                index === 1 ? "#3B82F6" :  // Backend - Blue
                                "#06B6D4"                  // Modern Stack - Cyan
                              } 
                            />
                          </div>
                          <div className={`absolute -bottom-6 sm:-bottom-8 text-[10px] sm:text-xs font-medium whitespace-nowrap px-2 sm:px-3 py-0.5 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 ${
                            index === 0 
                              ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-purple-500/20"
                              : index === 1
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/20"
                                : "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-500/20"
                          } shadow-lg`}>
                            {tech}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
