import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiMessageCircle, FiHeart, FiDownload } = FiIcons;

const Analytics = ({ botConfig }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    posts: [],
    reactions: [],
    engagement: [],
    topPosts: []
  });

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = () => {
      const posts = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        count: Math.floor(Math.random() * 10) + 5
      }));

      const reactions = Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        likes: Math.floor(Math.random() * 100) + 50,
        comments: Math.floor(Math.random() * 30) + 10,
        shares: Math.floor(Math.random() * 20) + 5
      }));

      const topPosts = [
        { id: 1, content: 'Amazing product launch! 🚀', reactions: 245, engagement: 89 },
        { id: 2, content: 'New features coming soon...', reactions: 189, engagement: 76 },
        { id: 3, content: 'Thank you for your support! ❤️', reactions: 156, engagement: 65 },
        { id: 4, content: 'Weekend special offers!', reactions: 134, engagement: 58 }
      ];

      setAnalyticsData({
        posts,
        reactions,
        engagement: posts.map(p => ({ ...p, rate: Math.floor(Math.random() * 30) + 60 })),
        topPosts
      });
    };

    loadAnalytics();
  }, [timeRange]);

  const getPostsChartOption = () => ({
    title: {
      text: 'Posts Over Time',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    xAxis: {
      type: 'category',
      data: analyticsData.posts.map(p => p.date),
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: 'value',
      name: 'Posts'
    },
    series: [{
      data: analyticsData.posts.map(p => p.count),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#3B82F6' },
      itemStyle: { color: '#3B82F6' },
      areaStyle: { color: 'rgba(59, 130, 246, 0.1)' }
    }]
  });

  const getReactionsChartOption = () => ({
    title: {
      text: 'Reactions Analysis',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['Likes', 'Comments', 'Shares'],
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: analyticsData.reactions.map(r => r.date),
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: 'value',
      name: 'Count'
    },
    series: [
      {
        name: 'Likes',
        type: 'bar',
        data: analyticsData.reactions.map(r => r.likes),
        itemStyle: { color: '#10B981' }
      },
      {
        name: 'Comments',
        type: 'bar',
        data: analyticsData.reactions.map(r => r.comments),
        itemStyle: { color: '#F59E0B' }
      },
      {
        name: 'Shares',
        type: 'bar',
        data: analyticsData.reactions.map(r => r.shares),
        itemStyle: { color: '#8B5CF6' }
      }
    ]
  });

  const getEngagementChartOption = () => ({
    title: {
      text: 'Engagement Rate',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}%'
    },
    xAxis: {
      type: 'category',
      data: analyticsData.engagement.map(e => e.date),
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: 'value',
      name: 'Engagement Rate (%)',
      min: 0,
      max: 100
    },
    series: [{
      data: analyticsData.engagement.map(e => e.rate),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#EF4444' },
      itemStyle: { color: '#EF4444' },
      areaStyle: { color: 'rgba(239, 68, 68, 0.1)' }
    }]
  });

  const totalReactions = analyticsData.reactions.reduce((sum, r) => sum + r.likes + r.comments + r.shares, 0);
  const totalPosts = analyticsData.posts.reduce((sum, p) => sum + p.count, 0);
  const avgEngagement = analyticsData.engagement.reduce((sum, e) => sum + e.rate, 0) / analyticsData.engagement.length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your bot's performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SafeIcon icon={FiDownload} />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Posts</p>
              <p className="text-2xl font-bold text-gray-800">{totalPosts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="text-blue-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Reactions</p>
              <p className="text-2xl font-bold text-gray-800">{totalReactions}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiHeart} className="text-green-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Engagement</p>
              <p className="text-2xl font-bold text-gray-800">{avgEngagement.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="text-purple-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Channels</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiMessageCircle} className="text-orange-600 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ReactECharts option={getPostsChartOption()} style={{ height: '300px' }} />
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ReactECharts option={getEngagementChartOption()} style={{ height: '300px' }} />
        </motion.div>
      </div>

      {/* Reactions Chart */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <ReactECharts option={getReactionsChartOption()} style={{ height: '400px' }} />
      </motion.div>

      {/* Top Posts */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Top Performing Posts</h2>
        <div className="space-y-4">
          {analyticsData.topPosts.map((post, index) => (
            <div key={post.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{post.content}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>{post.reactions} reactions</span>
                  <span>{post.engagement}% engagement</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;