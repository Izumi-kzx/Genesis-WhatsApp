import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, '🚩 Ingresa el enlace de un archivo de MediaFire.', m);
    if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, 'El enlace debe ser de un archivo de MediaFire.', m);
    await m.react('🕓');

    try {
        // Obtener detalles del enlace MediaFire usando la API
        let api = await fetch(`https://api.agungny.my.id/api/mediafire?url=${encodeURIComponent(args[0])}`);
        let json = await api.json();

        if (json.status !== "true") return m.reply('❌ Error al obtener los detalles del enlace, por favor intenta nuevamente.');

        let { title, url, size } = json.result;
        let txt = `乂  *M E D I A F I R E  -  D O W N L O A D*\n\n`;
        txt += `        ✩  *Nombre* : ${title || 'Sin título'}\n`;
        txt += `        ✩  *Peso* : ${size || 'Desconocido'}\n\n`;
        txt += `*- ↻ El archivo se está enviando, espera un momento. . .*`;

        // Enviar imagen de portada (puedes cambiar esta imagen si lo prefieres)
        let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer();
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);

        // Enviar archivo usando la URL obtenida
        await conn.sendFile(m.chat, url, title, null, m, null, { mimetype: 'application/octet-stream', asDocument: true });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        m.react('✖️');
        m.reply('❌ Ocurrió un error al procesar la solicitud.');
    }
};

handler.help = ['mediafire'].map(v => v + ' *<url>*');
handler.tags = ['downloader', 'premium'];
handler.command = ['mediafire', 'mdfire', 'mf'];
handler.premium = true;

export default handler;
