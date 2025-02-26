import fetch from 'node-fetch';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Ingresa el texto de lo que quieres buscar en imágenes 🔍');
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

        if (!json.results || json.results.length === 0) {
            return m.reply('No se encontraron imágenes para tu búsqueda.');
        }

        for (let item of json.results.slice(0, 9)) { // Tomamos las 5 primeras imágenes
            let image = await createImage(item.direct);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `◦ *Título:* ${item.title || 'Sin título'} \n◦ *Fuente:* [Ver en la web](${item.source})`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            "name": "cta_copy",
                            "buttonParamsJson": `{"display_text":"🌐 Ver Imagen","id":"view_image","copy_code":"${item.direct}"}`
                        }
                    ]
                })
            });
        }

        const msg = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `🔎 *Resultados de:* ${text}`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: '📸 Imágenes encontradas'
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
            },
            { quoted: m }
        );

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } catch (error) {
        console.error(error);
        m.reply('Ocurrió un error al buscar las imágenes. Inténtalo de nuevo.');
    }
};

handler.help = ["bingsearch <texto>"];
handler.tags = ["search"];
handler.command = /^(bingsearch)$/i;

export default handler;