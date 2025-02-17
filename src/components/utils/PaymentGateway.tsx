import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiLock, FiCheckCircle } from 'react-icons/fi';

const PaymentGateway = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    // Resetear después de 3 segundos
    setTimeout(() => {
      setSuccess(false);
      setStep(1);
    }, 3000);
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {success ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <FiCheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your transaction has been processed successfully.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
          >
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`flex items-center ${
                    num < step ? 'text-green-500' : num === step ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`w-full h-1 ${
                        num < step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVC
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Billing Address
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={3}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Order Summary
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                        <span className="text-gray-900 dark:text-white">$99.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Tax</span>
                        <span className="text-gray-900 dark:text-white">$9.90</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span className="text-gray-900 dark:text-white">Total</span>
                          <span className="text-blue-500">$108.90</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
