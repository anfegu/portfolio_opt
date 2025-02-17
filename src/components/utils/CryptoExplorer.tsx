import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiInfo, FiGlobe, FiHash, FiUsers, FiLink, FiTrendingUp, FiTrendingDown, FiActivity, FiBook } from 'react-icons/fi';

interface CryptoInfo {
  id: string;
  name: string;
  symbol: string;
  category: string;
  description: string;
  website: string;
  technology: string[];
  team: string[];
  partnerships: string[];
}

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

const cryptoDatabase: CryptoInfo[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    category: 'Store of Value',
    description: 'A decentralized digital currency without a central bank or administrator.',
    website: 'bitcoin.org',
    technology: ['Proof of Work', 'SHA-256', 'ECDSA', 'Lightning Network'],
    team: ['Satoshi Nakamoto'],
    partnerships: ['PayPal', 'Square', 'MicroStrategy']
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    category: 'Smart Contract Platform',
    description: 'A decentralized platform for building and deploying smart contracts.',
    website: 'ethereum.org',
    technology: ['Proof of Stake', 'Solidity', 'EVM', 'Layer 2 Solutions'],
    team: ['Vitalik Buterin', 'Joseph Lubin'],
    partnerships: ['Microsoft', 'Intel', 'JP Morgan']
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    category: 'Smart Contract Platform',
    description: 'A proof-of-stake blockchain platform built with academic research.',
    website: 'cardano.org',
    technology: ['Ouroboros', 'Haskell', 'Plutus', 'Hydra'],
    team: ['Charles Hoskinson', 'Jeremy Wood'],
    partnerships: ['Ethiopian Government', 'World Mobile', 'SingularityNET']
  }
];

const CryptoExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoInfo | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'info' | 'market'>('market');

  const categories = Array.from(new Set(cryptoDatabase.map(c => c.category)));

  useEffect(() => {
    let mounted = true;
    let interval: NodeJS.Timeout;

    const fetchMarketData = async () => {
      if (!mounted) return;

      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        if (!response.ok) throw new Error('API rate limit exceeded. Please try again later.');
        const data = await response.json();
        if (mounted) {
          setMarketData(data);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError('API rate limit exceeded. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchMarketData();
    interval = setInterval(fetchMarketData, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
      setMarketData([]);
      setError(null);
      setLoading(false);
      setSelectedCrypto(null);
      setSelectedCategory(null);
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const filteredMarketData = marketData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCryptoInfo = cryptoDatabase.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(crypto => !selectedCategory || crypto.category === selectedCategory);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setView('market');
                setSelectedCategory(null);
                setSelectedCrypto(null);
              }}
              className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                view === 'market'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <FiActivity />
              Market
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setView('info');
                setSelectedCategory(null);
                setSelectedCrypto(null);
              }}
              className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                view === 'info'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <FiBook />
              Info
            </motion.button>
          </div>
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search crypto..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {view === 'info' && (
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl backdrop-blur-sm transition-colors ${
                !selectedCategory
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              All Categories
            </motion.button>
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl backdrop-blur-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Market View */}
      {view === 'market' && (
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <FiActivity className="animate-spin text-4xl text-purple-400" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-400">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMarketData.map((crypto) => (
                <motion.div
                  key={crypto.id}
                  layoutId={crypto.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold flex items-center gap-2">
                          {crypto.name}
                          <span className="text-sm text-purple-300 font-normal">
                            {crypto.symbol.toUpperCase()}
                          </span>
                        </h3>
                        <div className="text-sm text-purple-200">
                          Rank #{crypto.market_cap_rank}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {formatPrice(crypto.current_price)}
                      </div>
                      <div className={`flex items-center justify-end text-sm ${
                        crypto.price_change_percentage_24h >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <FiTrendingUp className="mr-1" />
                        ) : (
                          <FiTrendingDown className="mr-1" />
                        )}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-purple-300 mb-1">Market Cap</div>
                      <div className="font-medium">
                        {formatNumber(crypto.market_cap)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-300 mb-1">24h High</div>
                      <div className="font-medium text-green-400">
                        {formatPrice(crypto.high_24h)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-300 mb-1">24h Low</div>
                      <div className="font-medium text-red-400">
                        {formatPrice(crypto.low_24h)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info View */}
      {view === 'info' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCryptoInfo.map(crypto => (
              <motion.div
                key={crypto.id}
                layoutId={`info-${crypto.id}`}
                onClick={() => setSelectedCrypto(crypto)}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{crypto.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-purple-300">{crypto.symbol}</span>
                      <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-full">
                        {crypto.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <FiInfo />
                  </div>
                </div>
                <p className="mt-4 text-purple-200 line-clamp-2">
                  {crypto.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedCrypto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCrypto(null);
          }}
        >
          <motion.div
            layoutId={`info-${selectedCrypto.id}`}
            className="bg-gradient-to-br from-indigo-800 to-purple-800 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{selectedCrypto.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-purple-300 text-xl">{selectedCrypto.symbol}</span>
                  <span className="text-sm px-3 py-1 bg-purple-500/20 rounded-full">
                    {selectedCrypto.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <FiGlobe />
                  <a href={`https://${selectedCrypto.website}`} target="_blank" rel="noopener noreferrer" 
                     className="hover:text-purple-200 transition-colors">
                    {selectedCrypto.website}
                  </a>
                </div>
                <p className="text-purple-200">
                  {selectedCrypto.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-purple-300 mb-2">
                  <FiHash />
                  <h3 className="font-semibold">Technology</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCrypto.technology.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-purple-300 mb-2">
                  <FiUsers />
                  <h3 className="font-semibold">Team</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCrypto.team.map(member => (
                    <span key={member} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-purple-300 mb-2">
                  <FiLink />
                  <h3 className="font-semibold">Partnerships</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCrypto.partnerships.map(partner => (
                    <span key={partner} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CryptoExplorer;