import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiDatabase, FiLayout, FiGitBranch, FiCloud, FiTool } from 'react-icons/fi';
import TranslatedText from './utils/TranslatedText';

interface Skill {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
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
      description: 'Passionate about building the financial future through blockchain technology, Expert in Smart Contracts and Cross-Chain protocols.',
      color: '#3B82F6'
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: 'Backend Systems',
      description: 'Building robust and scalable architectures with Rust and modern technologies. Specialist in high-performance distributed systems.',
      color: '#10B981'
    },
    {
      icon: <FiLayout className="w-6 h-6" />,
      title: 'Full Stack Development',
      description: 'Creating exceptional experiences combining Frontend and Backend. Expert in React, Flutter, and DApp development.',
      color: '#F59E0B'
    },
    {
      icon: <FiCloud className="w-6 h-6" />,
      title: 'Cloud Architecture',
      description: 'Designing cloud infrastructures that scale. Specialist in serverless architectures and high availability systems.',
      color: '#6366F1'
    },
    {
      icon: <FiGitBranch className="w-6 h-6" />,
      title: 'System Design',
      description: 'Architecting distributed solutions that balance performance and maintainability. Expert in Microservices and API design.',
      color: '#8B5CF6'
    },
    {
      icon: <FiTool className="w-6 h-6" />,
      title: 'Development Practices',
      description: 'Advocate for development best practices. Implementing Agile methodologies and Automation to ensure quality.',
      color: '#EC4899'
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
            {skills.map((skill) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 20px ${skill.color}20`
                }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden group backdrop-blur-sm"
                style={{
                  background: `
                    radial-gradient(circle at 0% 0%, ${skill.color}20 0%, transparent 35%),
                    radial-gradient(circle at 100% 100%, ${skill.color}15 0%, transparent 45%),
                    linear-gradient(45deg, ${skill.color}05 25%, transparent 25%, transparent 75%, ${skill.color}05 75%, ${skill.color}05)
                  `,
                  backgroundSize: '100% 100%, 100% 100%, 20px 20px'
                }}
              >
                <motion.div 
                  className="flex items-center gap-4 relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-all duration-700"
                    style={{
                      background: `
                        linear-gradient(135deg, ${skill.color}30 0%, transparent 100%),
                        radial-gradient(circle at 50% 50%, ${skill.color}20 0%, transparent 60%),
                        repeating-linear-gradient(45deg, ${skill.color}05 0%, ${skill.color}05 2%, transparent 2%, transparent 4%)
                      `,
                      filter: 'blur(10px)',
                      mixBlendMode: 'overlay'
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      backgroundSize: ['200% 200%', '100% 100%']
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear'
                    }}
                  />
                  <motion.div 
                    className="p-3 rounded-lg relative z-10 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:bg-[var(--skill-color)] group-hover:text-white transition-all duration-700 ease-in-out"
                    style={{ 
                      '--skill-color': skill.color,
                      backgroundColor: `${skill.color}20`,
                      color: skill.color,
                      boxShadow: `
                        0 0 30px ${skill.color}30,
                        inset 0 0 20px ${skill.color}20,
                        0 0 10px ${skill.color}10
                      `,
                      backdropFilter: 'blur(5px)'
                    } as any}
                  >
                    {skill.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {skill.title === 'Blockchain' || skill.title === 'Backend Systems' ? (
                      skill.title
                    ) : (
                      <TranslatedText text={skill.title} />
                    )}
                  </h3>
                </motion.div>

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300"
                    style={{
                      textShadow: `0 0 30px ${skill.color}10`
                    }}
                  >
                    {skill.description.split(/(Frontend|Backend|Rust|React|Flutter|TypeScript|Node\.js|AWS|Lambda|Solana|EVM|IBC|DApp)/).map((part, i, arr) => {
                      if (part.match(/(Frontend|Backend|Rust|React|Flutter|TypeScript|Node\.js|AWS|Lambda|Solana|EVM|IBC|DApp)/)) {
                        const nextPart = arr[i + 1] || '';
                        const needsSpaceBefore = i > 0;
                        const needsSpaceAfter = !nextPart.startsWith(',') && !nextPart.startsWith('.');
                        return (
                          <span key={i}>
                            {needsSpaceBefore ? ' ' : ''}
                            {part}
                            {needsSpaceAfter ? ' ' : ''}
                          </span>
                        );
                      }
                      return <TranslatedText key={i} text={part} />;
                    })}
                  </motion.p>
                </motion.div>
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
