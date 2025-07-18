import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiUsers, FiSend, FiTrendingUp, FiCheckCircle, FiAlertCircle } = FiIcons;

const Dashboard = ({ botConfig, currentPage, setCurrentPage }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalReactions: 0,
    activeChats: 0,
    successRate: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate loading stats
    const loadStats = () => {
      setStats({
        totalPosts: 1247,
        totalReactions: 8932,
        activeChats: 23,
        successRate: 96.5
      });

      setRecentActivity([
        { id: 1, type: 'post', message: 'Auto post sent to @mychannel', time: '2 mins ago', status: 'success' },
        { id: 2, type: 'reaction', message: '15 new reactions received', time: '5 mins ago', status: 'success' },
        { id: 3, type: 'error', message: 'Failed to send to @channel2', time: '10 mins ago', status: 'error' },
        { id: 4, type: 'post', message: 'Scheduled post completed', time: '15 mins ago', status: 'success' }
      ]);
    };

    loadStats();
  }, []);

  const statCards = [
    { title: 'Total Posts', value: stats.totalPosts, icon: FiSend, color: 'blue' },
    { title: 'Total Reactions', value: stats.totalReactions, icon: FiActivity, color: 'green' },
    { title: 'Active Chats', value: stats.activeChats, icon: FiUsers, color: 'purple' },
    { title: 'Success Rate', value: `${stats.successRate}%`, icon: FiTrendingUp, color: 'orange' }
  ];

  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your bot overview</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${botConfig.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium">
            {botConfig.isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorMap[stat.color]} flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <SafeIcon 
                  icon={activity.status === 'success' ? FiCheckCircle : FiAlertCircle} 
                  className={`text-sm ${activity.status === 'success' ? 'text-green-600' : 'text-red-600'}`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiSend} className="text-blue-600 text-2xl mb-2" />
            <p className="font-medium text-blue-800">Send Post Now</p>
          </motion.button>
          
          <motion.button
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiActivity} className="text-green-600 text-2xl mb-2" />
            <p className="font-medium text-green-800">View Analytics</p>
          </motion.button>
          
          <motion.button
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiUsers} className="text-purple-600 text-2xl mb-2" />
            <p className="font-medium text-purple-800">Manage Channels</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;