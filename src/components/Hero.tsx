import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiMail, FiMousePointer, FiTerminal } from 'react-icons/fi';
import { CVDownloadButton } from './utils';
import TranslatedText from './utils/TranslatedText';
import me2 from '../assets/images/me2.png';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [codeIndex, setCodeIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const codeSnippets = [
    {
      title: 'blockchain.rs',
      code: `impl Blockchain {
    fn mine_block(&mut self) -> Block {
        let block = Block::new(
            self.mempool.take(),
            self.chain.last().hash()
        );
        block.mine(self.difficulty)
    }
}`
    },
    {
      title: 'ml_model.py',
      code: `class Transformer:
    def attention(self, q, k, v):
        d_k = q.size(-1)
        scores = q @ k.transpose(-2,-1)
        scores = scores/math.sqrt(d_k)
        return F.softmax(scores) @ v`
    },
    {
      title: 'trading.ts',
      code: `class AlgoTrader {
    async execute(pair: string) {
        const [ma7, ma25] = await Promise.all([
            this.getMA(pair, 7),
            this.getMA(pair, 25)
        ])
        return ma7 > ma25 ? buy() : sell()
    }
}`
    },
    {
      title: 'smart_pool.sol',
      code: `contract LiquidityPool {
    function swap(uint dx) external {
        uint dy = (dx * resY) / (resX + dx);
        require(dy <= resY, "insufficient Y");
        _update(resX + dx, resY - dy);
        token0.transfer(msg.sender, dy);
    }
}`
    }
  ];

  useEffect(() => {
    setIsTyping(true);
    let currentCode = '';
    const targetCode = codeSnippets[codeIndex].code;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < targetCode.length) {
        currentCode += targetCode[currentIndex];
        setDisplayedCode(currentCode);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [codeIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    {
      icon: <FiGithub size={24} />,
      url: 'https://github.com/anfegu',
      label: 'GitHub'
    },
    {
      icon: <FiLinkedin size={24} />,
      url: 'https://www.linkedin.com/in/anfegu',
      label: 'LinkedIn'
    },
    {
      icon: <FiMail size={24} />,
      url: 'mailto:anfegu86@gmail.com',
      label: 'Email'
    },
    {
      icon: <CVDownloadButton />,
      label: 'Download CV'
    }
  ];

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800/50 transition-colors duration-300 pt-12"
    >
      {/* Content */}
      <motion.div
        className="relative z-20 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-start pt-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-center space-y-6 mb-8">
          <motion.div
            variants={itemVariants}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/50 shadow-xl shadow-blue-500/20"
          >
            <img 
              src={me2} 
              alt="Andrés Gutiérrez" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300"
            variants={itemVariants}
          >
            Andrés Gutiérrez
          </motion.h1>
          
          <motion.div
            className="text-lg md:text-2xl max-w-2xl text-center"
            variants={itemVariants}
          >
            <TranslatedText
              text="Senior Software Engineer"
              className="block mb-2 text-gray-800 dark:text-gray-200"
            />
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              <TranslatedText text="Specialized in" />{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Blockchain
              </span>{''}
              <TranslatedText text=", Financial Systems and Fullstack Development" />
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6"
          >
            {socialLinks.map(({ icon, url, label }) => (
              <motion.a
                key={label}
                href={url}
                {...(url ? {
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {})}
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group ${
                  label === 'Download CV' ? 'animate-pulse hover:animate-none' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                {icon}
                {label === 'Download CV' && (
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <TranslatedText text="Download CV" />
                  </span>
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Code Snippets */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl mb-10"
          onClick={() => setCodeIndex((prev) => (prev + 1) % codeSnippets.length)}
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 ring-1 ring-gray-200 dark:ring-gray-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
              <FiTerminal className="text-blue-500" />
              <span className="text-sm font-medium">{codeSnippets[codeIndex].title}</span>
              <span className="ml-auto text-xs opacity-60 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300">
                <FiMousePointer className="inline-block mr-1 text-blue-500" size={12} />
                Click to change
              </span>
            </div>
            <div className="h-[120px] font-mono text-left p-3 bg-white/80 dark:bg-gray-900/80 rounded backdrop-blur-sm">
              <motion.pre
                key={codeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-800 dark:text-gray-200 h-full overflow-y-auto relative"
              >
                <code>
                  {displayedCode}
                  {showCursor && isTyping && (
                    <span className="inline-block w-1.5 h-3 -mb-0.5 bg-blue-500 dark:bg-blue-400 animate-pulse">
                      &nbsp;
                    </span>
                  )}
                </code>
              </motion.pre>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-3 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full p-1">
            <motion.div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto"
              animate={{
                y: [0, 16, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
