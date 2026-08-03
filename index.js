const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const TOKEN = process.env.token

const bot = new TelegramBot(TOKEN, { polling: true })
function startText(username, f, l) {
  return `
<blockquote><i>

<b> Hi! <a href="https://t.me/${username}">${f} ${l == true ? l : ''}</a> 👋

➢ My Pixelix-Bro
➢ My Portfolio Pixelix.uz
➢ My Web Developer
➢ My Ai Engener
➢ My Mabile Developer
</b>
</i>
</blockquote>
`
}

bot.on('message', (msg) => {
  let chatid = msg.chat.id
  let text = msg.text
  let admin = 8194599016
  let usersid = msg.from?.id
  let username = msg.from.username
  let f = msg?.from.first_name
  let l = msg?.from.last_name

  if (text == '/start') {
    bot.sendPhoto(chatid, './img/banner.jpg', {
      caption: startText(username, f, l),
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Adminga Habar ✈️',
              url: 'https://t.me/Pixeelix',
            },
            {
              text: 'Men Haqimda ☺️',
              callback_data: 'my',
            },
          ],
          [
            {
              text: 'Skillarm 📊',
              callback_data: 'skil',
            },
          ],
        ],
      },
    })
  }

  if (text == '/panel') {
    if (admin == msg.from.id) {
      bot.sendMessage(chatid, 'Hush kelibsiz admin🙂', {
        reply_markup: {
          keyboard: [[{ text: 'Statitika 📊' }, { text: 'Habar 📲' }], [{ text: 'Chiqish 🏠' }]],
          resize_keyboard: true,
        },
      })
    } else {
      bot.sendSticker(chatid, 'https://t.me/ongoing_an1meelar/41')
    }
  }
})

bot.on('callback_query', (msg) => {
  let data = msg.data
  let chatid = msg.message.chat.id
  let messageid = msg.message.message_id
  let username = msg.from.username
  let f = msg?.from.first_name
  let l = msg?.from.last_name
  switch (data) {
    case 'skil':
      if (data == 'skil') {
        bot.editMessageCaption(
          `<b><i><a href="https://t.me/${username}">${f ? f : ''} ${l ? l : ''}</a> Bro My Tech Skills</i></b>

          <blockquote><i><b>          ➦My Frontend Skills⮪
➢ Html/Css,               ➢ Tailwindcss
➢ JavaScript,             ➢ npm,
➢ React.js,                 ➢ yarn,
➢ Next.js,                   ➢ package,
➢ Preact.js,                ➢ git/github,
</b></i></blockquote><blockquote><i><b>          ➦My Backend Skills⮪
➢ Node.js,
➢ Express,                                ➢ npm,
➢ Mongose,                             ➢ yarn,
➢ MOngoDb,                           ➢ package,
➢ node-telegram-bot-api,     ➢ git/github,
</b></i></blockquote>


          `,
          {
            chat_id: chatid,
            message_id: messageid,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '💻 GitHub Profilm ',
                    url: 'https://github.com/Pixelix-Bro/',
                    color: 'blue',
                  },
                ],
                [
                  {
                    text: '📩 Telegram Profilm ',
                    url: 'https://t.me/Pixeelix',
                    color: 'blue',
                  },
                  {
                    text: '«',
                    callback_data: 'back',
                  },
                ],
              ],
            },
          }
        )
      }
      break

    case 'my':
      if (data == 'my') {
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
            parse_mode: 'HTML',
            message_id: messageid,
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '«',
                    callback_data: 'back',
                  },
                ],
              ],
            },
          }
        )
      }
      break

    case 'back':
      if (data == 'back') {
        return bot.editMessageCaption(startText(username, f, l), {
          chat_id: chatid,
          parse_mode: 'HTML',
          message_id: messageid,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Adminga Habar ✈️',
                  url: 'https://t.me/DEV_BR0',
                },
                {
                  text: 'Men Haqimda ☺️',
                  callback_data: 'my',
                },
              ],
              [
                {
                  text: 'Skillarm 📊',
                  callback_data: 'skil',
                },
              ],
            ],
          },
        })
      }
      break
  }

  bot.answerCallbackQuery(msg.id, {
    text: 'Yuklanmoqda...',
    show_alert: false,
  })
})

let users = new Set()

bot.on('message', (msg) => {
  let text = msg.text
  let chatid = msg.chat.id
  users.add(msg.from.id)

  switch (true) {
    case text.toLowerCase().includes('stati'):
      bot.sendMessage(chatid, `Statistika 📊\n\n foydalanuvchlar soni : ${users.size}`)
      break
    case text.toLowerCase().includes('chiqi'):
      bot.sendMessage(chatid, 'Admin Paneldan chqdingiz 🏠', {
        reply_markup: {
          remove_keyboard: true,
        },
      })
      break
  }
})
