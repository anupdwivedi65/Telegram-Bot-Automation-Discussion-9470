import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';
import cron from 'cron';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

class TelegramBotManager {
  constructor() {
    this.bot = null;
    this.scheduledJobs = new Map();
    this.isActive = false;
  }

  initializeBot(token) {
    try {
      this.bot = new TelegramBot(token, { polling: true });
      this.isActive = true;
      
      // Bot event handlers
      this.bot.on('message', (msg) => {
        console.log('Received message:', msg);
        this.handleMessage(msg);
      });

      this.bot.on('callback_query', (query) => {
        console.log('Received callback query:', query);
        this.handleCallbackQuery(query);
      });

      return { success: true, message: 'Bot initialized successfully' };
    } catch (error) {
      console.error('Bot initialization failed:', error);
      return { success: false, message: error.message };
    }
  }

  async sendMessage(chatId, text, options = {}) {
    if (!this.bot || !this.isActive) {
      throw new Error('Bot not initialized');
    }

    try {
      const result = await this.bot.sendMessage(chatId, text, options);
      return { success: true, messageId: result.message_id };
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }

  async sendPhoto(chatId, photo, options = {}) {
    if (!this.bot || !this.isActive) {
      throw new Error('Bot not initialized');
    }

    try {
      const result = await this.bot.sendPhoto(chatId, photo, options);
      return { success: true, messageId: result.message_id };
    } catch (error) {
      console.error('Send photo error:', error);
      throw error;
    }
  }

  async sendVideo(chatId, video, options = {}) {
    if (!this.bot || !this.isActive) {
      throw new Error('Bot not initialized');
    }

    try {
      const result = await this.bot.sendVideo(chatId, video, options);
      return { success: true, messageId: result.message_id };
    } catch (error) {
      console.error('Send video error:', error);
      throw error;
    }
  }

  schedulePost(postData) {
    const { id, chatId, content, mediaType, mediaUrl, time } = postData;
    
    // Parse time (assuming format HH:MM)
    const [hours, minutes] = time.split(':').map(Number);
    
    const job = new cron.CronJob(
      `${minutes} ${hours} * * *`, // Every day at specified time
      async () => {
        try {
          if (mediaType === 'image' && mediaUrl) {
            await this.sendPhoto(chatId, mediaUrl, { caption: content });
          } else if (mediaType === 'video' && mediaUrl) {
            await this.sendVideo(chatId, mediaUrl, { caption: content });
          } else {
            await this.sendMessage(chatId, content);
          }
          console.log(`Scheduled post ${id} sent successfully`);
        } catch (error) {
          console.error(`Failed to send scheduled post ${id}:`, error);
        }
      },
      null,
      true,
      'UTC'
    );

    this.scheduledJobs.set(id, job);
    return { success: true, message: 'Post scheduled successfully' };
  }

  cancelScheduledPost(postId) {
    const job = this.scheduledJobs.get(postId);
    if (job) {
      job.destroy();
      this.scheduledJobs.delete(postId);
      return { success: true, message: 'Scheduled post cancelled' };
    }
    return { success: false, message: 'Scheduled post not found' };
  }

  handleMessage(msg) {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Auto-reply logic
    if (text === '/start') {
      this.sendMessage(chatId, 'Welcome! I am your automated bot. How can I help you today?');
    } else if (text === '/help') {
      this.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show this help message\n/status - Check bot status');
    } else if (text === '/status') {
      this.sendMessage(chatId, 'Bot is running and ready to serve!');
    }
  }

  handleCallbackQuery(query) {
    const chatId = query.message.chat.id;
    const data = query.data;

    // Handle inline keyboard callbacks
    this.bot.answerCallbackQuery(query.id, { text: 'Button clicked!' });
    
    // Add your callback handling logic here
    switch (data) {
      case 'like':
        this.sendMessage(chatId, 'Thanks for the like! ❤️');
        break;
      case 'subscribe':
        this.sendMessage(chatId, 'Thanks for subscribing! 🔔');
        break;
      default:
        this.sendMessage(chatId, 'Unknown action');
    }
  }

  async getBotInfo() {
    if (!this.bot || !this.isActive) {
      throw new Error('Bot not initialized');
    }

    try {
      const me = await this.bot.getMe();
      return { success: true, botInfo: me };
    } catch (error) {
      console.error('Get bot info error:', error);
      throw error;
    }
  }

  async getChatInfo(chatId) {
    if (!this.bot || !this.isActive) {
      throw new Error('Bot not initialized');
    }

    try {
      const chat = await this.bot.getChat(chatId);
      return { success: true, chatInfo: chat };
    } catch (error) {
      console.error('Get chat info error:', error);
      throw error;
    }
  }

  stopBot() {
    if (this.bot) {
      this.bot.stopPolling();
      this.isActive = false;
      
      // Cancel all scheduled jobs
      this.scheduledJobs.forEach(job => job.destroy());
      this.scheduledJobs.clear();
      
      return { success: true, message: 'Bot stopped successfully' };
    }
    return { success: false, message: 'Bot not running' };
  }
}

const botManager = new TelegramBotManager();

// API Routes
app.post('/api/bot/init', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is required' });
  }

  const result = botManager.initializeBot(token);
  res.json(result);
});

app.post('/api/bot/send-message', async (req, res) => {
  try {
    const { chatId, text, options } = req.body;
    const result = await botManager.sendMessage(chatId, text, options);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/bot/send-photo', async (req, res) => {
  try {
    const { chatId, photo, options } = req.body;
    const result = await botManager.sendPhoto(chatId, photo, options);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/bot/schedule-post', (req, res) => {
  try {
    const result = botManager.schedulePost(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/bot/schedule-post/:id', (req, res) => {
  try {
    const result = botManager.cancelScheduledPost(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/bot/info', async (req, res) => {
  try {
    const result = await botManager.getBotInfo();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/bot/chat/:chatId', async (req, res) => {
  try {
    const result = await botManager.getChatInfo(req.params.chatId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/bot/stop', (req, res) => {
  const result = botManager.stopBot();
  res.json(result);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Telegram Bot API server running on port ${PORT}`);
});

export default botManager;