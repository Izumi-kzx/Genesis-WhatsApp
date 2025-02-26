import fetch from 'node-fetch';
import { proto, generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en Bing 🖼️');
    await m.react('🕓');

    try {
        let api = await fetch(`https://delirius-apiofc.vercel.app/search/bingimage?query=${encodeURIComponent(text)}`);
        let json = await api.json();
        let results = [];

        for (let img of json.results) {
            let media = await prepareWAMessageMedia({ image: { url: img.direct } }, { upload: conn.waUploadToServer });

            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '*[ GenesisBot By Angel-OFC ]*' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `🔍 Imagen de: ${text}`,
                    hasMediaAttachment: true,
                    imageMessage: media.imageMessage
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
            });
        }

        const messageContent = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `📸 *Resultados de:* ${text}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '_`ᴀ` `ɴ` `ɪ` `ᴍ` `ᴇ` - `2` `0` `2` `4`_'
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: results
                        })
                    })
                }
            }
        }, { quoted: m });

        await m.react('✅');
        await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });

    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error al buscar imágenes. Intenta de nuevo.');
    }
};

handler.help = ["bingsearch <texto>"];
handler.tags = ["search"];
handler.command = /^(bingsearch)$/i;

export default handler;