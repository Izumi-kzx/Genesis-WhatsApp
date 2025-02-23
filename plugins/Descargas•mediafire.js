import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🍟 Ingresa un link de MediaFire.`, m);
    await m.react('🕓');

    try {
        let api = await fetch(`https://api.agungny.my.id/api/mediafire?url=${encodeURIComponent(text)}`);
        let json = await api.json();
        if (json.status !== "true") return m.reply('❌ Error al obtener los detalles del enlace, por favor intenta nuevamente.');

        let { title, link, filename, size, repair } = json.result;
        let caption = `*「✐」${title || filename}*\n\n` +
                      `> ❒ Tamaño » *${size || 'Desconocido'}*\n` +
                      `> 🔗 [Descargar](${link})\n` +
                      `> 🔄 Reparar » [Aquí](${repair})\n` +
                      `> 🌐 Enlace de descarga: [Click aquí](${link})`;

        // Descargar el archivo desde el enlace proporcionado
        let file = await fetch(link);
        let buffer = await file.buffer();

        // Enviar el archivo con el caption
        await conn.sendFile(m.chat, buffer, filename || 'file', caption, m, null, { asDocument: true });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
}

handler.help = ['mediafire *<url>*'];
handler.tags = ['dl'];
handler.command = ['mediafire'];

export default handler;






/* import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `🍟 Ingresa un link de MediaFire.`, m);
    await m.react('🕓');

    try {
        let api = await fetch(`https://api.agungny.my.id/api/mediafire?url=${encodeURIComponent(text)}`);
        let json = await api.json();
        if (json.status !== "true") return m.reply('❌ Error al obtener los detalles del enlace, por favor intenta nuevamente.');

        let { fileName, downloadLink, fileSize } = json.result;
        let caption = `*「✐」${fileName}*\n\n> ❒ Tamaño » *${fileSize || 'Desconocido'}*\n> 🔗 [Descargar](${downloadLink})`;

        // Enviar el archivo con el caption
        await conn.sendFile(m.chat, downloadLink, fileName, caption, m, null, { asDocument: true });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
}

handler.help = ['mediafire *<url>*'];
handler.tags = ['dl'];
handler.command = ['mediafire'];

export default handler; */