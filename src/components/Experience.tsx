import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import TranslatedText from './utils/TranslatedText';

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const springConfig = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  mass: 1
};

const cardVariants: Variants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? 100 : -100,
    scale: 0.8,
    rotateY: isEven ? 45 : -45
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      ...springConfig,
      duration: 1.2,
      opacity: { duration: 0.5 }
    }
  }
};

const experiences: Experience[] = [
  {
    id: 1,
    role: "Backend Engineer",
    company: "AC Photo Service",
    location: "Remote",
    period: "2024",
    description: [
      "Developed serverless image processing system with Rust and AWS Lambda",
      "Implemented microservices architecture with S3 and SQS for high availability",
      "Optimized costs and performance through asynchronous processing",
      "Achieved auto-scaling and significant reduction in processing times"
    ],
    technologies: ["Rust", "AWS Lambda", "S3", "SQS", "Microservices"]
  },
  {
    id: 2,
    role: "Senior Blockchain Engineer",
    company: "Oiga - 10Pearls",
    location: "Remote",
    period: "2023 - 2024",
    description: [
      "Developed high-performance SDKs for cross-chain operations with Rust",
      "Integrated IBC protocols for communication between Cosmos, Solana, and EVM networks",
      "Implemented token bridging system using Wormhole",
      "Designed real-time query system and cross-chain error handling"
    ],
    technologies: ["Rust", "Cosmos SDK", "IBC", "Solana", "Wormhole", "Axum"]
  },
  {
    id: 3,
    role: "Senior Software Engineer",
    company: "Virtualness",
    location: "Silicon Valley (Remote)",
    period: "2022 - 2023",
    description: [
      "Led development of NFT e-commerce platform with 10,000 concurrent templates",
      "Developed ERC-1155 smart contracts and integration with Polygon Layer 2",
      "Implemented ERC20 minting and wallet transfer system",
      "Designed cloud architecture with Express and Node.js REST API"
    ],
    technologies: ["Ethereum", "IPFS", "ERC-1155", "Polygon", "Node.js", "Express"]
  },
  {
    id: 4,
    role: "Senior Analyst",
    company: "Cryptocurrency Portfolio",
    location: "Remote",
    period: "2022",
    description: [
      "Developed MERN platform with TypeScript for crypto portfolio management",
      "Implemented JWT authentication and MongoDB storage system",
      "Integrated real-time price APIs and exchange smart contracts",
      "Designed responsive interface with Bootstrap and TypeScript error handling"
    ],
    technologies: ["TypeScript", "MERN Stack", "MongoDB", "JWT", "Smart Contracts"]
  }
];

const Experience = () => {
  const [ref] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="pt-24 pb-16 -mt-16 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/5 dark:to-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
              <TranslatedText text="Professional Experience" />
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              <TranslatedText text="Experience in leading technology companies" />
            </p>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 w-[2px] bg-gradient-to-b from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-300" 
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                custom={index % 2 === 0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px", amount: 0.4 }}
                transition={{ 
                  delay: index * 0.3,
                  ...springConfig,
                  duration: 1.2
                }}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                }`}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.3 + 0.2, duration: 0.5 }}
                  className={`absolute ${
                    index % 2 === 0 ? 'right-0 md:left-auto md:right-[-9px]' : 'left-0 md:left-[-9px]'
                  } top-0 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 border-4 border-white dark:border-gray-900`} 
                />

                <div className={`ml-6 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'
                }`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                          <TranslatedText text={exp.role} />
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                            <FiCalendar className="flex-shrink-0" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiBriefcase className="flex-shrink-0" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                            <FiMapPin className="flex-shrink-0" />
                            <span><TranslatedText text={exp.location} /></span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                          {exp.description.map((desc, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: false, amount: 0.4 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className="flex items-start"
                            >
                              <span className="mr-2 mt-1.5 text-blue-500 dark:text-blue-400">•</span>
                              <span>
                                <TranslatedText text={desc} />
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                          <TranslatedText text="Core Technologies" />
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: false, amount: 0.4 }}
                              transition={{ delay: 0.6 + idx * 0.05 }}
                              className="text-sm px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
