import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSend, FiClock, FiImage, FiVideo, FiFile, FiPlus, FiTrash2, FiPlay, FiPause } = FiIcons;

const AutoPost = ({ botConfig }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Welcome to our channel! 🎉',
      mediaType: 'none',
      mediaUrl: '',
      scheduled: true,
      time: '10:00',
      status: 'active'
    }
  ]);

  const [newPost, setNewPost] = useState({
    content: '',
    mediaType: 'none',
    mediaUrl: '',
    scheduled: false,
    time: ''
  });

  const [isAutoPostEnabled, setIsAutoPostEnabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addPost = () => {
    if (newPost.content.trim()) {
      setPosts(prev => [...prev, {
        ...newPost,
        id: Date.now(),
        status: 'active'
      }]);
      setNewPost({
        content: '',
        mediaType: 'none',
        mediaUrl: '',
        scheduled: false,
        time: ''
      });
    }
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const toggleAutoPost = () => {
    setIsAutoPostEnabled(!isAutoPostEnabled);
  };

  const sendNow = async (post) => {
    // Simulate sending post
    console.log('Sending post:', post);
    // Add API call here
  };

  const mediaIcons = {
    none: FiSend,
    image: FiImage,
    video: FiVideo,
    file: FiFile
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Auto Post</h1>
          <p className="text-gray-600 mt-1">Manage your automated posts</p>
        </div>
        
        <motion.button
          onClick={toggleAutoPost}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isAutoPostEnabled 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SafeIcon icon={isAutoPostEnabled ? FiPause : FiPlay} />
          <span>{isAutoPostEnabled ? 'Disable' : 'Enable'} Auto Post</span>
        </motion.button>
      </div>

      {/* Create New Post */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Post</h2>
        
        <div className="space-y-4">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What do you want to post?"
            />
          </div>

          {/* Media Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Type
            </label>
            <select
              name="mediaType"
              value={newPost.mediaType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="none">No Media</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="file">File</option>
            </select>
          </div>

          {/* Media URL */}
          {newPost.mediaType !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media URL
              </label>
              <input
                type="url"
                name="mediaUrl"
                value={newPost.mediaUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* Scheduling */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="scheduled"
                checked={newPost.scheduled}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Schedule Post</span>
            </label>
            
            {newPost.scheduled && (
              <input
                type="time"
                name="time"
                value={newPost.time}
                onChange={handleInputChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>

          {/* Add Button */}
          <motion.button
            onClick={addPost}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <SafeIcon icon={FiPlus} />
              <span>Add Post</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Scheduled Posts</h2>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={mediaIcons[post.mediaType]} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {post.mediaType === 'none' ? 'Text Post' : `${post.mediaType} Post`}
                    </span>
                    {post.scheduled && (
                      <div className="flex items-center space-x-1 text-xs text-orange-600">
                        <SafeIcon icon={FiClock} />
                        <span>{post.time}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-800 mb-2">{post.content}</p>
                  {post.mediaUrl && (
                    <p className="text-xs text-gray-500 truncate">{post.mediaUrl}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    onClick={() => sendNow(post)}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Now
                  </motion.button>
                  <motion.button
                    onClick={() => deletePost(post.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiTrash2} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <SafeIcon icon={FiSend} className="text-4xl mx-auto mb-4 opacity-50" />
              <p>No posts scheduled yet. Create your first post above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoPost;