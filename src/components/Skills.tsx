import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TranslatedText from './utils/TranslatedText';

interface Expertise {
  category: string;
  skills: string[];
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
    skills: [
      "Smart Contracts (ERC20/721/1155)",
      "Cross-chain & Layer 2",
      "Zero Knowledge Proofs",
      "DeFi & NFT Protocols",
      "Cosmos SDK & IBC",
      "Solidity & Rust",
      "Web3 Integration"
    ]
  },
  {
    category: "Backend Architecture",
    skills: [
      "Rust & Distributed Systems",
      "Serverless & Cloud Native",
      "Microservices & AWS",
      "High Availability",
      "High-Performance APIs",
      "Optimization & Scalability",
      "Security & Best Practices"
    ]
  },
  {
    category: "Modern Stack",
    skills: [
      "TypeScript & React",
      "Node.js & Express",
      "Testing & CI/CD",
      "Clean Architecture",
      "NoSQL Databases",
      "RESTful & GraphQL APIs",
      "Agile Development"
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
      className="pt-24 pb-8 -mt-16 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                <TranslatedText text="Education & Skills" />
              </h2>
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-900/30 dark:via-gray-800 dark:to-cyan-900/30 rounded-xl p-5 shadow-lg mb-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-xl" />
                <div className="relative">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    <TranslatedText text="Software Engineer" />
                  </p>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                    <TranslatedText text="La Salle University Colombia" />
                  </p>
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                <TranslatedText text="Technical Expertise" />
              </h3>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left"
            >
              {expertise.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={skillCardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                    <TranslatedText text={exp.category} />
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="text-sm px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        {skill.split(' ').map((word, j) => (
                          <>
                            {/^[A-Z]/.test(word) || word.includes('ERC') || word.includes('&') ? (
                              word
                            ) : (
                              <TranslatedText key={j} text={word} />
                            )}
                            {j < skill.split(' ').length - 1 && ' '}
                          </>
                        ))}
                      </motion.span>
                    ))}
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
