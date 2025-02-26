import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en Bing 🖼️');
    await m.react('🕓');

    try {
        async function createImage(url) {
            const { imageMessage } = await generateWAMessageContent(
                { image: { url } },
                { upload: conn.waUploadToServer }
            );
            return imageMessage;
        }

        let push = [];
        let api = await fetch(`https://delirius-apiofc.vercel.app/search/bingimage?query=${encodeURIComponent(text)}`);
        let json = await api.json();

        for (let img of json.results) {
            let image = await createImage(img.direct);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `🔍 *Título:* ${img.title}\n🌐 *Fuente:* ${img.source}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: ''
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image
                })
            });
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `📸 *Resultados de:* ${text}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '🔎 Imágenes obtenidas desde Bing'
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: [...push]
                        })
                    })
                }
            }
        }, { quoted: m });

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error al buscar imágenes. Intenta de nuevo.');
    }
};

handler.help = ["bingsearch <texto>"];
handler.tags = ["search"];
handler.command = /^(bingsearch)$/i;

export default handler;