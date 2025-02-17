import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiCheck, FiLoader } from 'react-icons/fi';

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
}

const ZKProofDemo = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Generate Secret",
      description: "Creating a private value that will remain hidden",
      status: 'pending'
    },
    {
      id: 2,
      title: "Compute Hash",
      description: "Generating cryptographic commitment",
      status: 'pending'
    },
    {
      id: 3,
      title: "Create Proof",
      description: "Constructing zero-knowledge proof",
      status: 'pending'
    },
    {
      id: 4,
      title: "Verify Proof",
      description: "Validating proof without revealing secret",
      status: 'pending'
    }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [secret, setSecret] = useState('');
  const [proofResult, setProofResult] = useState<string | null>(null);

  const runSimulation = async () => {
    if (!secret) return;
    setIsRunning(true);
    setProofResult(null);

    // Reset steps
    setSteps(steps => steps.map(step => ({ ...step, status: 'pending' })));

    // Simulate each step
    for (let i = 0; i < steps.length; i++) {
      // Update current step to processing
      setSteps(currentSteps => 
        currentSteps.map(step => 
          step.id === i + 1 ? { ...step, status: 'processing' } : step
        )
      );

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mark step as completed
      setSteps(currentSteps => 
        currentSteps.map(step => 
          step.id === i + 1 ? { ...step, status: 'completed' } : step
        )
      );
    }

    // Show final result
    setProofResult('Proof verified successfully! The verifier knows the statement is true without learning the secret value.');
    setIsRunning(false);
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Zero-Knowledge Proof Demo
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Secret Value
              </label>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter a value to prove knowledge of..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                disabled={isRunning}
              />
            </div>
            <button
              onClick={runSimulation}
              disabled={!secret || isRunning}
              className={`w-full py-3 rounded-lg font-medium ${
                !secret || isRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {isRunning ? 'Generating Proof...' : 'Start Proof Generation'}
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
              animate={{
                scale: step.status === 'processing' ? 1.02 : 1,
                opacity: step.status === 'pending' ? 0.7 : 1
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                    : step.status === 'processing'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}>
                  {step.status === 'completed' ? (
                    <FiCheck size={20} />
                  ) : step.status === 'processing' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <FiLoader size={20} />
                    </motion.div>
                  ) : (
                    <FiLock size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="ml-5 mt-4 h-8 border-l-2 border-gray-200 dark:border-gray-700" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Result */}
        <AnimatePresence>
          {proofResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg"
            >
              {proofResult}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ZKProofDemo;
