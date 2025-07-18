import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiCheck, FiAlertCircle, FiEye, FiEyeOff } = FiIcons;

const BotSetup = ({ botConfig, updateBotConfig }) => {
  const [formData, setFormData] = useState({
    token: botConfig.token || '',
    channelId: botConfig.channelId || '',
    webhookUrl: '',
    autoReply: true,
    postInterval: 30
  });

  const [showToken, setShowToken] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (formData.token && formData.channelId) {
        updateBotConfig({
          ...formData,
          isConnected: true
        });
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bot Setup</h1>
        <p className="text-gray-600">Configure your Telegram bot settings</p>
      </div>

      {/* Setup Form */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-6">
          {/* Bot Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bot Token
            </label>
            <div className="relative">
              <input
                type={showToken ? 'text' : 'password'}
                name="token"
                value={formData.token}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your bot token from @BotFather"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showToken ? FiEyeOff : FiEye} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Get your bot token from @BotFather on Telegram
            </p>
          </div>

          {/* Channel ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel ID
            </label>
            <input
              type="text"
              name="channelId"
              value={formData.channelId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="@yourchannel or -100123456789"
            />
          </div>

          {/* Webhook URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL (Optional)
            </label>
            <input
              type="url"
              name="webhookUrl"
              value={formData.webhookUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://yourserver.com/webhook"
            />
          </div>

          {/* Auto Reply */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="autoReply"
              name="autoReply"
              checked={formData.autoReply}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="autoReply" className="text-sm font-medium text-gray-700">
              Enable Auto Reply
            </label>
          </div>

          {/* Post Interval */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto Post Interval (minutes)
            </label>
            <input
              type="number"
              name="postInterval"
              value={formData.postInterval}
              onChange={handleInputChange}
              min="1"
              max="1440"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Connect Button */}
          <motion.button
            onClick={handleConnect}
            disabled={isConnecting || !formData.token || !formData.channelId}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
              isConnecting || !formData.token || !formData.channelId
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isConnecting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <SafeIcon icon={FiSettings} />
                <span>Connect Bot</span>
              </div>
            )}
          </motion.button>

          {/* Connection Status */}
          {connectionStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg flex items-center space-x-2 ${
                connectionStatus === 'success' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <SafeIcon icon={connectionStatus === 'success' ? FiCheck : FiAlertCircle} />
              <span className="font-medium">
                {connectionStatus === 'success' 
                  ? 'Bot connected successfully!' 
                  : 'Failed to connect. Please check your credentials.'}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">Setup Instructions:</h3>
        <ol className="text-sm text-blue-700 space-y-2">
          <li>1. Create a bot using @BotFather on Telegram</li>
          <li>2. Copy the bot token and paste it above</li>
          <li>3. Add your bot to your channel as an admin</li>
          <li>4. Get your channel ID (use @userinfobot)</li>
          <li>5. Click "Connect Bot" to start automation</li>
        </ol>
      </div>
    </div>
  );
};

export default BotSetup;