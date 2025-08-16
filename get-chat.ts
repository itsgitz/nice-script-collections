// install packages:
// npm install node-telegram-bot-api
// npm install --save-dev @types/node-telegram-bot-api

import TelegramBot, { Chat } from "node-telegram-bot-api";

// Replace this with your actual bot token from BotFather
//const token = process.env.TELEGRAM_BOT_TOKEN;
const token = "8054857711:AAE7GaU8Sf6A5tAsUT4QtlLdgMEf5yYOBns";
if (!token) {
  throw new Error("Please define TELEGRAM_BOT_TOKEN environment variable");
}

// Initialize your bot with polling enabled (or use webhooks)
const bot = new TelegramBot(token, { polling: true });

/**
 * Fetches and logs chat info from a given chat ID or username.
 * @param chatIdOrUsername Numeric chat ID (e.g., -1001234567890) or username (e.g., "@groupname")
 */
async function fetchChatInfo(chatIdOrUsername: number | string) {
  try {
    const chat: Chat = await bot.getChat(chatIdOrUsername);
    console.log("Chat info:", JSON.stringify(chat, null, 2));
    return chat;
  } catch (err: unknown) {
    console.error("Failed to get chat info:", err);
    throw err;
  }
}

// Example usage:
// Replace 'CHAT_ID_OR_USERNAME_HERE' with the actual group ID or username
//const targetChat = process.env.TARGET_CHAT_ID ?? "CHAT_ID_OR_USERNAME_HERE";
const targetChat = "6942633617";
fetchChatInfo(targetChat);
