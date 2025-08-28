
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth()
});

let botActivo = true;
let nsfwActivo = false;

// QR para vincular el bot
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Sangwoo Bot está listo.');
});

// 📌 Presentación cuando alguien entra a un grupo
client.on('group_join', async (notification) => {
    if (!botActivo) return;
    const chat = await notification.getChat();
    chat.sendMessage(
`𝑯𝒐𝒍𝒂, 𝒔𝒐𝒚 𝑺𝒂𝒏𝒈𝒘𝒐𝒐.  
𝑭𝒖𝒊 𝒄𝒓𝒆𝒂𝒅𝒐 𝒑𝒐𝒓 𝑽444L.  

➤ 𝑷𝒖𝒆𝒅𝒆𝒔 𝒗𝒆𝒓 𝒎𝒊 𝒎𝒆𝒏ú 𝒆𝒔𝒄𝒓𝒊𝒃𝒊𝒆𝒏𝒅𝒐: #menu  

⚠ 𝑨𝒅𝒗𝒆𝒓𝒕𝒆𝒏𝒄𝒊𝒂𝒔:  
- 𝑵𝒐 𝒔𝒑𝒂𝒎 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔.  
- 𝑵𝒐 𝒐𝒇𝒆𝒏𝒅𝒆𝒓 𝒂 𝒐𝒕𝒓𝒐𝒔 𝒖𝒔𝒖𝒂𝒓𝒊𝒐𝒔.  
- 𝑺𝒊 𝒂𝒃𝒖𝒔𝒂𝒔, 𝒎𝒆 𝒑𝒖𝒆𝒅𝒐 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒓.`
    );
});

// 📌 Función para obtener GIFs random de anime
async function getGif(action) {
    try {
        const res = await axios.get(`https://nekos.best/api/v2/${action}`);
        return res.data.results[0].url;
    } catch (err) {
        return null;
    }
}

// 📌 Lista de acciones SFW
const sfwActions = ["hug","kiss","slap","pat","cry","dance","smile","bite","handhold","punch","kick","cuddle","happy","wink"];

// 📌 Lista de acciones NSFW (ejemplo)
const nsfwActions = ["cum","anal","blowjob","boobs","pussy"];

// 📌 Comandos del bot
client.on('message', async msg => {
    if (!botActivo && !msg.body.startsWith("#bot")) return;

    const chat = await msg.getChat();
    const sender = await msg.getContact();

    // Bot On/Off
    if (msg.body === "#bot off") {
        botActivo = false;
        return msg.reply("🔴 𝑬𝒍 𝒃𝒐𝒕 𝒇𝒖𝒆 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐.");
    }
    if (msg.body === "#bot on") {
        botActivo = true;
        return msg.reply("🟢 𝑬𝒍 𝒃𝒐𝒕 𝒇𝒖𝒆 𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐.");
    }

    // NSFW On/Off
    if (msg.body === "#nsfw off") {
        nsfwActivo = false;
        return msg.reply("🔞 𝑴𝒐𝒅𝒐 𝑵𝑺𝑭𝑾 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐.");
    }
    if (msg.body === "#nsfw on") {
        nsfwActivo = true;
        return msg.reply("🔞 𝑴𝒐𝒅𝒐 𝑵𝑺𝑭𝑾 𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐.");
    }

    // Menú
    if (msg.body === "#menu") {
        return msg.reply(
`📜 𝑴𝒆𝒏ú 𝒅𝒆 𝑺𝒂𝒏𝒈𝒘𝒐𝒐  

✅ 𝑺𝑭𝑾  
${sfwActions.map(a => `#${a} @usuario`).join(", ")}  

🔞 𝑵𝑺𝑭𝑾 (𝒔𝒐𝒍𝒐 𝒄𝒖𝒂𝒏𝒅𝒐 𝒆𝒔𝒕é 𝒂𝒄𝒕𝒊𝒗𝒐)  
${nsfwActions.map(a => `#${a} @usuario`).join(", ")}  

⚙ 𝑼𝒕𝒊𝒍𝒊𝒅𝒂𝒅𝒆𝒔  
#hora, #dado, #moneda, #sticker, #tab mensaje`
        );
    }

    // Utilidades
    if (msg.body === "#hora") {
        const hora = new Date().toLocaleTimeString("es-CO", { hour: '2-digit', minute: '2-digit' });
        return msg.reply(`🕒 𝑳𝒂 𝒉𝒐𝒓𝒂 𝒂𝒄𝒕𝒖𝒂𝒍 𝒆𝒔: ${hora}`);
    }

    if (msg.body === "#dado") {
        return msg.reply(`🎲 𝑬𝒍 𝒅𝒂𝒅𝒐 𝒄𝒂𝒚ó 𝒆𝒏: ${Math.floor(Math.random() * 6) + 1}`);
    }

    if (msg.body === "#moneda") {
        return msg.reply(`🪙 𝑳𝒂 𝒎𝒐𝒏𝒆𝒅𝒂 𝒄𝒂𝒚ó 𝒆𝒏: ${Math.random() < 0.5 ? "Cara" : "Cruz"}`);
    }

    if (msg.hasMedia && msg.body === "#sticker") {
        const media = await msg.downloadMedia();
        client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
        return;
    }

    // 📌 Tab (solo admins)
    if (msg.body.startsWith("#tab")) {
        if (chat.isGroup) {
            let texto = msg.body.slice(4).trim();
            if (texto.length === 0) texto = "Mensaje para todos";
            let mentions = [];
            for (let participant of chat.participants) {
                mentions.push(await client.getContactById(participant.id._serialized));
            }
            return chat.sendMessage(`📢 ${texto}`, { mentions });
        }
    }

    // 📌 Acciones SFW con GIF
    for (let action of sfwActions) {
        if (msg.body.startsWith(`#${action}`)) {
            const mentioned = await msg.getMentions();
            if (mentioned.length > 0) {
                const gif = await getGif(action);
                if (gif) {
                    chat.sendMessage(
                        `${sender.pushname} hizo **${action}** a ${mentioned[0].pushname}\n${gif}`
                    );
                }
            }
        }
    }

    // 📌 Acciones NSFW (si está activo)
    if (nsfwActivo) {
        for (let action of nsfwActions) {
            if (msg.body.startsWith(`#${action}`)) {
                const mentioned = await msg.getMentions();
                if (mentioned.length > 0) {
                    msg.reply(`🔞 ${sender.pushname} hizo **${action}** a ${mentioned[0].pushname} (gif NSFW random)`);
                }
            }
        }
    }
});

client.initialize();
