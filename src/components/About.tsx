import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiDatabase, FiLayout, FiGitBranch, FiCloud, FiTool } from 'react-icons/fi';
import TranslatedText from './utils/TranslatedText';

interface Skill {
  icon: JSX.Element;
  title: string;
  description: string;
  level: number;
}

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skills: Skill[] = [
    {
      icon: <FiCode className="w-6 h-6" />,
      title: 'Blockchain',
      description: 'Smart Contracts, Cross-Chain Protocols, IBC, Solana, EVM Networks',
      level: 95
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: 'Backend Systems',
      description: 'Rust, Axum, Diesel ORM, AWS Lambda',
      level: 90
    },
    {
      icon: <FiLayout className="w-6 h-6" />,
      title: 'Full Stack Development',
      description: 'React, Flutter, TypeScript, Node.js, DApp Integration',
      level: 85
    },
    {
      icon: <FiCloud className="w-6 h-6" />,
      title: 'Cloud Architecture & Infrastructure',
      description: 'AWS, Serverless, High Availability Systems',
      level: 88
    },
    {
      icon: <FiGitBranch className="w-6 h-6" />,
      title: 'System Design',
      description: 'Microservices, API Design, Distributed Systems',
      level: 92
    },
    {
      icon: <FiTool className="w-6 h-6" />,
      title: 'Development Practices',
      description: 'Agile, CI/CD, Testing, Documentation',
      level: 90
    }
  ];

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
      id="about"
      ref={ref}
      className="relative py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1), rgba(37,99,235,0) 50%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
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
              <TranslatedText text="About Me" />
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <TranslatedText text="Senior Full Stack Developer with over 10 years of experience in Financial Technology and Enterprise Solutions. Expert in Blockchain and Distributed Systems. Known for adaptability, effective methodology, and excellent team communication." />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 dark:text-blue-400 mr-3">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skill.title === 'Blockchain' || skill.title.includes('Rust') ? (
                      skill.title
                    ) : (
                      <TranslatedText text={skill.title} />
                    )}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {skill.description.split(', ').map((part, index, array) => (
                    <>
                      {/^[A-Z]/.test(part) ? part : <TranslatedText key={index} text={part} />}
                      {index < array.length - 1 && ', '}
                    </>
                  ))}
                </p>
                <div className="relative h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full flex items-center justify-end pr-2 text-xs text-white font-medium"
                    style={{
                      background: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)'
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    {skill.level}%
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <button
              onClick={() => {
                document.querySelector('#work')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-600/20 transform hover:-translate-y-1"
            >
              <TranslatedText text="View My Projects" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
