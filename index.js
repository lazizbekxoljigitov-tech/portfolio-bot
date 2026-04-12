const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const TOKEN = process.env.token;

const bot = new TelegramBot(TOKEN, { polling: true });
const startText = `
👋 Assalomu alaykum!

Mening portfolio botim 🤖

📌 Men haqimda
💻 Loyihalar
🛠 Skills
📞 Aloqa
`;

bot.on("message", (msg) => {
  let chatid = msg.chat.id;
  let text = msg.text;

  if (text == "/start") {
    bot.sendPhoto(
      chatid,
      "https://formation.lefebvre-dalloz.fr/sites/default/files/styles/3_2_700/public/medias/images/2024-05/comment-developper-sa-creativite-avec-l-ia.png.webp?itok=5tJNC3FZ",
      {
        caption: startText,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Adminga Habar ✈️",
                url: "https://t.me/DEV_BR0",
              },
              {
                text: "Men Haqimda ☺️",
                callback_data: "my",
              },
            ],
            [
              {
                text: "Skillarm 📊",
                callback_data: "skil",
              },
            ],
          ],
        },
      },
    );
  }
});

bot.on("callback_query", (msg) => {
  let data = msg.data;
  let chatid = msg.message.chat.id;
  let messageid = msg.message.message_id;

  switch (data) {
    case "skil":
      if (data == "skil") {
        bot.editMessageCaption(
          `💻 TECH SKILLS

⚡ Programming:
- JavaScript (ES6+)
- Node.js

🤖 Bot Development:
- Telegram Bot API
- node-telegram-bot-api

🌐 Web:
- HTML, CSS
- API integration

🛠 Tools:
- Git, GitHub
- VS Code

🚀 Goal:
Doimiy rivojlanish va yangi texnologiyalarni o‘rganish`,
          {
            chat_id: chatid,
            message_id: messageid,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🌐 Portfolio ",
                    url: "https://dev-bro.netlify.app/pages/front-end",
                    color: "red",
                  },
                  {
                    text: "💻 GitHub Profilm ",
                    url: "https://github.com/lazizbekxoljigitov-tech/",
                    color: "blue",
                  },
                ],
                [
                  {
                    text: "📩 Telegram Profilm ",
                    url: "https://t.me/DEV_BR0",
                    color: "blue",
                  },
                  {
                    text: "«",
                    callback_data: "back",
                  },
                ],
              ],
            },
          },
        );
      }
      break;

    case "my":
      if (data == "my") {
        bot.editMessageCaption(
          `
      👤 Men haqimda

Men dasturlashga qiziqadigan yosh developerman 💻

Bo‘sh vaqtlarimda animelar, dramalar va donghua ko‘rishni yoqtiraman 🎬
Bu menga dam olish va yangi fikrlar olishga yordam beradi.

Mening eng yaxshi ko‘rgan mashg‘ulotlarim:
- Kod yozish va yangi narsalarni o‘rganish 💻
- O‘zimning kichik loyihalarimni yaratish 🛠
- O‘yinlar va kreativ g‘oyalar ustida ishlash 🎮

Maqsadim — o‘zimning kuchli loyihalarimni yaratish va professional developer bo‘lish 🚀
      `,
          {
            chat_id: chatid,
            message_id: messageid,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "«",
                    callback_data: "back",
                  },
                ],
              ],
            },
          },
        );
      }
      break;

    case "back":
      if (data == "back") {
        return bot.editMessageCaption(startText, {
          chat_id: chatid,
          message_id: messageid,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Adminga Habar ✈️",
                  url: "https://t.me/DEV_BR0",
                },
                {
                  text: "Men Haqimda ☺️",
                  callback_data: "my",
                },
              ],
              [
                {
                  text: "Skillarm 📊",
                  callback_data: "skil",
                },
              ],
            ],
          },
        });
      }
      break;
  }

  bot.answerCallbackQuery(msg.id, {
    text: "Yuklanmoqda...",
    show_alert: false,
  });
});
