const settings = require('../settings');
const fs = require('fs');
const path = require('path');

/* ================= MENU DATA ================= */

const MENUS = {
  general: `
🌐 *GENERAL COMMANDS*
.help / .menu
.ping
.alive
.tts <text>
.owner
.joke
.quote
.fact
.weather <city>
.news
.attp <text>
.lyrics <song>
.groupinfo
.staff / .admins
.vv
.trt <text> <lang>
.ss <link>
.jid
.url
`,

  admin: `
👮‍♂️ *ADMIN COMMANDS*
.ban @user
.promote @user
.demote @user
.mute <minutes>
.unmute
.del
.kick @user
.warn @user
.warnings @user
.tag
.tagall
.tagnotadmin
.hidetag
.antilink
.antibadword
.resetlink
.welcome <on/off>
.goodbye <on/off>
.setgname
.setgdesc
.setgpp
`,

  owner: `
🔒 *OWNER COMMANDS*
.mode <public/private>
.clearsession
.antidelete
.cleartmp
.update
.settings
.setpp
.autoreact <on/off>
.autostatus <on/off>
.autotyping <on/off>
.autoread <on/off>
.anticall <on/off>
.pmblocker <on/off>
`,

  image: `
🎨 *IMAGE / STICKER*
.sticker
.blur
.crop
.removebg
.remini
.emojimix
.take
.meme
.tgsticker
`,

  game: `
🎮 *GAMES*
.tictactoe
.hangman
.guess
.trivia
.truth
.dare
`,

  downloader: `
📥 *DOWNLOADER*
.play
.song
.spotify
.instagram
.facebook
.tiktok
.video
.ytmp4
`,

  fun: `
🎯 *FUN*
.compliment
.insult
.flirt
.ship
.simp
.character
.stupid
`,

  ai: `
🤖 *AI*
.gpt
.gemini
.imagine
.flux
.sora
`
};

/* ================= MAIN MENU ================= */

async function helpCommand(sock, chatId, message) {

  const menuText = `
🤖 *${settings.botName || 'KnightBot-MD'}*
Version: *${settings.version || '3.0.0'}*
Owner: *${settings.botOwner || 'Mr Unique Hacker'}*

Chagua menu hapa chini 👇
`;

  const buttons = [
    { buttonId: 'menu_general', buttonText: { displayText: '🌐 GENERAL' }, type: 1 },
    { buttonId: 'menu_admin', buttonText: { displayText: '👮 ADMIN' }, type: 1 },
    { buttonId: 'menu_owner', buttonText: { displayText: '🔒 OWNER' }, type: 1 },
    { buttonId: 'menu_image', buttonText: { displayText: '🎨 IMAGE' }, type: 1 },
    { buttonId: 'menu_game', buttonText: { displayText: '🎮 GAMES' }, type: 1 },
    { buttonId: 'menu_down', buttonText: { displayText: '📥 DOWNLOAD' }, type: 1 },
    { buttonId: 'menu_fun', buttonText: { displayText: '🎯 FUN' }, type: 1 },
    { buttonId: 'menu_ai', buttonText: { displayText: '🤖 AI' }, type: 1 }
  ];

  const imagePath = path.join(__dirname, '../assets/bot_image.jpg');

  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    await sock.sendMessage(chatId, {
      image: imageBuffer,
      caption: menuText,
      buttons,
      headerType: 4
    }, { quoted: message });
  } else {
    await sock.sendMessage(chatId, {
      text: menuText,
      buttons,
      headerType: 1
    }, { quoted: message });
  }
}

/* ================= BUTTON HANDLER ================= */

async function handleMenuButtons(sock, chatId, msg) {
  if (!msg.message?.buttonsResponseMessage) return;

  const id = msg.message.buttonsResponseMessage.selectedButtonId;

  if (id === 'menu_general') return sock.sendMessage(chatId, { text: MENUS.general });
  if (id === 'menu_admin') return sock.sendMessage(chatId, { text: MENUS.admin });
  if (id === 'menu_owner') return sock.sendMessage(chatId, { text: MENUS.owner });
  if (id === 'menu_image') return sock.sendMessage(chatId, { text: MENUS.image });
  if (id === 'menu_game') return sock.sendMessage(chatId, { text: MENUS.game });
  if (id === 'menu_down') return sock.sendMessage(chatId, { text: MENUS.downloader });
  if (id === 'menu_fun') return sock.sendMessage(chatId, { text: MENUS.fun });
  if (id === 'menu_ai') return sock.sendMessage(chatId, { text: MENUS.ai });
}

/* ================= EXPORT ================= */

module.exports = {
  helpCommand,
  handleMenuButtons
};
