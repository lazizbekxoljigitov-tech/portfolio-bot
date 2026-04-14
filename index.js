const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const TOKEN = process.env.token;

const bot = new TelegramBot(TOKEN, { polling: true });
const startText = `
👋 Assalomu alaykum!

📌 Men haqimda
💻 Loyihalar
🛠 Skills
📞 Aloqa
`;

bot.on("message", (msg) => {
  let chatid = msg.chat.id;
  let text = msg.text;
  let admin = 8194599016;
  let usersid = msg.from?.id;

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

  if (text == "/panel") {
    if (admin == msg.from.id) {
      bot.sendMessage(chatid, "Hush kelibsiz admin🙂", {
        reply_markup: {
          keyboard: [
            [{ text: "Statitika 📊" }, { text: "Habar 📲" }],
            [{ text: "Chiqish 🏠" }],
          ],
          resize_keyboard: true,
        },
      });
    } else {
      bot.sendSticker(chatid, "https://t.me/ongoing_an1meelar/41");
    }
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

let users = new Set();

bot.on("message", (msg) => {
  let text = msg.text;
  let chatid = msg.chat.id;
  users.add(msg.from.id);

  switch (true) {
    case text.toLowerCase().includes("stati"):
      bot.sendMessage(
        chatid,
        `Statistika 📊\n\n foydalanuvchlar soni : ${users.size}`,
      );
      break;
    case text.toLowerCase().includes("chiqi"):
      bot.sendMessage(chatid, "Admin Paneldan chqdingiz 🏠", {
        reply_markup: {
          remove_keyboard: true,
        },
      });
      break;
    case text.toLowerCase().includes("habar" || ""):
      bot.sendMessage(chatid, "Habar Kiritig:");
      let message = text.replace("habar");

      users.forEach((item) => {
        bot.sendMessage(item, message);
      });

      bot.sendMessage(chatid, "Habar Yuborildi ✅");
      break;
  }
});
