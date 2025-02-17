import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiSearch, FiMoon, FiSun } from 'react-icons/fi';

const InteractiveGallery = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const filters = ['All', 'Design', 'Development', 'Marketing', 'Business'];

  const items = [
    { id: 1, title: 'Modern Dashboard', category: 'Design', color: 'bg-blue-500' },
    { id: 2, title: 'E-commerce Platform', category: 'Development', color: 'bg-purple-500' },
    { id: 3, title: 'Social Media App', category: 'Marketing', color: 'bg-green-500' },
    { id: 4, title: 'Analytics Tool', category: 'Business', color: 'bg-yellow-500' },
    { id: 5, title: 'Portfolio Template', category: 'Design', color: 'bg-pink-500' },
    { id: 6, title: 'Task Manager', category: 'Development', color: 'bg-indigo-500' },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedFilter || selectedFilter === 'All' || item.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`w-full h-full ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {view === 'grid' ? <FiGrid size={20} /> : <FiList size={20} />}
            </button>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>

          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <motion.div
          layout
          className={`grid gap-4 ${
            view === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                className={`${
                  view === 'grid' ? 'aspect-square' : 'h-24'
                } rounded-xl overflow-hidden cursor-pointer ${item.color} relative group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <h3 className="text-white text-lg font-semibold">
                      {item.title}
                    </h3>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-3 py-1 bg-white/20 rounded-full text-white text-sm backdrop-blur-sm hover:bg-white/30 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
                {selectedItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <div className="text-white text-center space-y-4">
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      <p className="text-sm opacity-80">
                        Interactive preview for {item.title.toLowerCase()} with smooth animations and responsive design.
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(null);
                        }}
                        className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        Close Preview
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveGallery;
