import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import BotSetup from './components/BotSetup';
import AutoPost from './components/AutoPost';
import Analytics from './components/Analytics';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [botConfig, setBotConfig] = useState({
    token: '',
    channelId: '',
    isConnected: false
  });

  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const savedConfig = localStorage.getItem('telegramBotConfig');
    if (savedConfig) {
      setBotConfig(JSON.parse(savedConfig));
    }
  }, []);

  const updateBotConfig = (config) => {
    setBotConfig(config);
    localStorage.setItem('telegramBotConfig', JSON.stringify(config));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          <motion.main 
            className="flex-1 ml-64 p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={
                <Dashboard 
                  botConfig={botConfig} 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              } />
              <Route path="/setup" element={
                <BotSetup 
                  botConfig={botConfig} 
                  updateBotConfig={updateBotConfig}
                />
              } />
              <Route path="/autopost" element={
                <AutoPost botConfig={botConfig} />
              } />
              <Route path="/analytics" element={
                <Analytics botConfig={botConfig} />
              } />
            </Routes>
          </motion.main>
        </div>
      </div>
    </Router>
  );
}

export default App;