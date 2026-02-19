import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();
const { BOT_TOKEN, LOGS_CHANNEL, ADMIN_ID } = process.env;

const BOT = new Telegraf(BOT_TOKEN);

BOT.start((ctx) => {
  ctx.reply("📬 Отправьте сообщение для редакции — мы его увидим и ответим при необходимости.");
});

BOT.on("message", async (ctx) => {
  const from = ctx.from;
  const messageText = ctx.message.text || "[медиа/другое сообщение]";

  await BOT.telegram.sendMessage(
    LOGS_CHANNEL,
    `📥 Coll Message\n\nСообщение от @${from.username || from.first_name} (${from.id}):\n\n${messageText}`
  );

  await ctx.reply("✅ Спасибо! Ваше сообщение получено.");
});

BOT.launch();
