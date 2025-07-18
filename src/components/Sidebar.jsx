import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiSettings, FiSend, FiBarChart3, FiZap } = FiIcons;

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/' },
    { id: 'setup', label: 'Bot Setup', icon: FiSettings, path: '/setup' },
    { id: 'autopost', label: 'Auto Post', icon: FiSend, path: '/autopost' },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart3, path: '/analytics' }
  ];

  const handleNavigation = (item) => {
    setCurrentPage(item.id);
    navigate(item.path);
  };

  return (
    <motion.div 
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiZap} className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">TeleBot Pro</h1>
            <p className="text-sm text-gray-500">Auto Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={item.icon} className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="font-semibold text-sm">Pro Features</h3>
          <p className="text-xs opacity-90 mt-1">Advanced automation & analytics</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;