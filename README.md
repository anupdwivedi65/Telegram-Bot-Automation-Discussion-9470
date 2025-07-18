# Telegram Bot Dashboard

A comprehensive Telegram bot management dashboard with auto-posting, analytics, and advanced features.

## Features

### 🤖 Bot Management
- Easy bot setup with token integration
- Real-time connection status
- Bot configuration management

### 📝 Auto Posting
- Schedule posts with specific times
- Support for text, images, videos, and files
- Bulk post management
- Instant posting capability

### 📊 Analytics & Insights
- Post performance tracking
- Engagement rate monitoring
- Reaction analytics (likes, comments, shares)
- Top performing posts analysis
- Interactive charts and graphs

### 🎯 Advanced Features
- Auto-reply functionality
- Webhook integration
- Multiple channel support
- Cron job scheduling
- Real-time activity monitoring

## Quick Start

### 1. Frontend Setup
```bash
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3. Bot Configuration
1. Create a bot using @BotFather on Telegram
2. Copy the bot token
3. Add your bot to your channel as admin
4. Get your channel ID using @userinfobot
5. Configure the bot in the dashboard

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHANNEL_ID=your_channel_id_here
PORT=3001
```

## API Endpoints

### Bot Management
- `POST /api/bot/init` - Initialize bot with token
- `GET /api/bot/info` - Get bot information
- `POST /api/bot/stop` - Stop bot

### Messaging
- `POST /api/bot/send-message` - Send text message
- `POST /api/bot/send-photo` - Send photo with caption
- `POST /api/bot/send-video` - Send video with caption

### Scheduling
- `POST /api/bot/schedule-post` - Schedule a post
- `DELETE /api/bot/schedule-post/:id` - Cancel scheduled post

### Analytics
- `GET /api/bot/chat/:chatId` - Get chat information
- `GET /api/health` - Health check

## Bot Commands

Users can interact with your bot using these commands:

- `/start` - Start the bot
- `/help` - Show help message
- `/status` - Check bot status

## Features in Detail

### Auto Posting
- **Text Posts**: Simple text messages
- **Media Posts**: Images, videos, and files with captions
- **Scheduled Posts**: Set specific times for automatic posting
- **Bulk Operations**: Manage multiple posts at once

### Analytics Dashboard
- **Real-time Metrics**: Live tracking of bot performance
- **Engagement Analysis**: Track likes, comments, and shares
- **Performance Charts**: Visual representation of data
- **Export Functionality**: Download analytics data

### Bot Setup
- **Token Integration**: Secure bot token management
- **Channel Configuration**: Easy channel setup
- **Webhook Support**: Optional webhook integration
- **Auto-reply Settings**: Customize automatic responses

## Technology Stack

### Frontend
- React 18 with Hooks
- Tailwind CSS for styling
- Framer Motion for animations
- ECharts for data visualization
- React Router for navigation

### Backend
- Node.js with Express
- Telegram Bot API
- Cron jobs for scheduling
- CORS enabled
- Environment configuration

## Security Features

- Secure token handling
- Environment variable protection
- Input validation
- Error handling and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

**Note**: Make sure to keep your bot token secure and never commit it to version control.