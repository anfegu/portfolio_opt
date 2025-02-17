import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiUnlock, FiClock, FiTrendingUp } from 'react-icons/fi';

interface NFT {
  id: number;
  name: string;
  rarity: string;
  stakingPower: number;
  isStaked: boolean;
  stakedAt?: number;
  rewards: number;
}

const NFTStaking = () => {
  const [nfts, setNfts] = useState<NFT[]>([
    { id: 1, name: 'Crypto Knight #123', rarity: 'Rare', stakingPower: 15, isStaked: false, rewards: 0 },
    { id: 2, name: 'Crypto Knight #456', rarity: 'Epic', stakingPower: 25, isStaked: false, rewards: 0 },
    { id: 3, name: 'Crypto Knight #789', rarity: 'Legendary', stakingPower: 40, isStaked: false, rewards: 0 },
  ]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate rewards accumulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNfts(currentNfts => 
        currentNfts.map(nft => {
          if (nft.isStaked) {
            const timeStaked = Date.now() - (nft.stakedAt || 0);
            const newRewards = (timeStaked / 1000) * (nft.stakingPower / 100);
            return { ...nft, rewards: newRewards };
          }
          return nft;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate totals
  useEffect(() => {
    setTotalStaked(nfts.filter(nft => nft.isStaked).length);
    setTotalRewards(nfts.reduce((acc, nft) => acc + nft.rewards, 0));
  }, [nfts]);

  const handleStakeUnstake = async (nft: NFT) => {
    setIsProcessing(true);

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    setNfts(currentNfts =>
      currentNfts.map(n => {
        if (n.id === nft.id) {
          return {
            ...n,
            isStaked: !n.isStaked,
            stakedAt: !n.isStaked ? Date.now() : undefined,
            rewards: 0
          };
        }
        return n;
      })
    );

    setIsProcessing(false);
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <FiLock />
              <span className="font-medium">Total Staked</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalStaked} / {nfts.length} NFTs
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <FiTrendingUp />
              <span className="font-medium">Total Rewards</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalRewards.toFixed(4)} TOKENS
            </div>
          </div>
        </div>

        {/* NFT List */}
        <div className="space-y-4">
          {nfts.map((nft) => (
            <motion.div
              key={nft.id}
              layoutId={`nft-${nft.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {nft.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                      {nft.rarity}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Staking Power: {nft.stakingPower}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {nft.isStaked && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Rewards: {nft.rewards.toFixed(4)} TOKENS
                    </div>
                  )}
                  <button
                    onClick={() => handleStakeUnstake(nft)}
                    disabled={isProcessing}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      nft.isStaked
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                        : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <FiClock />
                        </motion.div>
                        Processing...
                      </>
                    ) : nft.isStaked ? (
                      <>
                        <FiUnlock />
                        Unstake
                      </>
                    ) : (
                      <>
                        <FiLock />
                        Stake
                      </>
                    )}
                  </button>
                </div>
              </div>
              {nft.isStaked && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-1 bg-blue-500/20 mt-4 rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="h-full w-1/3 bg-blue-500 rounded-full"
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTStaking;
