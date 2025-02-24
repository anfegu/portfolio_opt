import { 
  SiRust, SiReact, SiTypescript, SiNodedotjs,
  SiAmazon, SiPostgresql, SiMongodb, SiRedis,
  SiGraphql, SiPrisma, SiTailwindcss, SiNextdotjs,
  SiVite, SiExpress, SiSolana, 
  SiDocker, SiKubernetes, SiServerless,
  SiTestinglibrary, SiJest, SiOptimism,
  SiApollographql, SiSmartthings, SiFlutter,
  
  
  SiPostman, SiSwagger, SiGit, SiGithub,
  SiVercel, 
  SiCircleci, SiSolidity,
  SiWeb3Dotjs
} from 'react-icons/si';
import { 
  BiCoin, 
  BiNetworkChart,
  
  
  BiShieldAlt2} from 'react-icons/bi';
import { 
  FaEthereum, FaLayerGroup, 
  
  FaNetworkWired, 
  FaCloud, FaLock, 
  FaLayerGroup as FaRollup
} from 'react-icons/fa';
import {
  IoSpeedometer, IoServerOutline,
  
  IoCodeSlash, 
  IoRefreshCircle, IoGitNetwork,
  IoEye
} from 'react-icons/io5';
import { motion } from 'framer-motion';

interface TechIconsProps {
  techs: string[];
  color: string;
}

const iconMap: { [key: string]: any } = {
  // Blockchain & Web3
  'Rust': SiRust,
  'Solidity': SiSolidity,
  'Smart Contracts': SiSmartthings,
  'Cross-chain': BiNetworkChart,
  'Layer 2': FaLayerGroup,
  'Zero Knowledge': FaLock,
  'DeFi': BiCoin,
  'Web3': SiWeb3Dotjs,
  'Solana': SiSolana,
  'Ethereum': FaEthereum,
  'Optimism': SiOptimism,
  'Upgradeable': IoRefreshCircle,
  'MEV Protection': BiShieldAlt2,
  'Rollups': FaRollup,
  'Bridges': IoGitNetwork,
  'Oracles': IoEye,

  // Backend Architecture
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'Redis': SiRedis,
  'GraphQL': SiGraphql,
  'Prisma': SiPrisma,
  'AWS': SiAmazon,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Serverless': SiServerless,
  'Distributed Systems': FaNetworkWired,
  'High-Performance': IoSpeedometer,
  'APIs': IoCodeSlash,
  'Microservices': IoServerOutline,
  'Cloud Native': FaCloud,

  // Modern Stack
  'React': SiReact,
  'TypeScript': SiTypescript,
  'Next.js': SiNextdotjs,
  'Vite': SiVite,
  'TailwindCSS': SiTailwindcss,
  'Testing': SiTestinglibrary,
  'Jest': SiJest,
  'CI/CD': SiCircleci,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Vercel': SiVercel,
  'Apollo': SiApollographql,
  'RESTful': SiSwagger,
  'Flutter': SiFlutter,
  'Postman': SiPostman,
};

const TechIcons: React.FC<TechIconsProps> = ({ techs, color }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {techs.map((tech, i) => {
        const Icon = iconMap[tech];
        if (!Icon) return null;

        return (
          <motion.div
            key={tech}
            className="group relative"
            style={{ color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.2 }}
          >
            <Icon 
              className="w-6 h-6 transition-all duration-300 group-hover:filter group-hover:drop-shadow-lg" 
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechIcons;
