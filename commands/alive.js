const settings = require("../settings");
async function aliveCommand(sock, chatId, message) {
    try {
        const message1 = `*𝙿𝚁𝙸𝙽𝙲𝙴 𝚇𝙼𝙳 𝙱𝙾𝚃 is Active!*\n\n` +
                       `*Version:* ${settings.version}\n` +
                       `*Status:* Online\n` +
                       `*Mode:* Public\n\n` +
                       `*🌟 Features:*\n` +
                       `• Group Management\n` +
                       `• Antilink Protection\n` +
                       `• Fun Commands\n` +
                       `• And more!\n\n` +
                       `Type *.menu* for full command list`;

        await sock.sendMessage(chatId, {
            text: message1,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363422824898123@newsletter',
                    newsletterName: '𝙿𝚁𝙸𝙽𝙲𝙴 𝚇𝙼𝙳 𝙱𝙾𝚃',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });
    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: 'Bot is alive and running!' }, { quoted: message });
    }
}

module.exports = aliveCommand;