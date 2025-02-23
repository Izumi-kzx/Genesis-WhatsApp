/* 
- Downloader Spotify By Izumi-kzx
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '[ ᰔᩚ ] Ingresa el nombre o enlace para buscar en *Spotify*.\n\n' + 
      `Ejemplo:\n> *${usedPrefix + command}* https://open.spotify.com/track/123456789`,
      m
    );
  }

  await m.react('🕓');

  try {
    const response = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(text)}`);
    const result = await response.json();

    if (result.status === 200 && result.result?.status) {
      const { title, type, artists, releaseDate, cover, music } = result.result;

      const mensaje = `🎵 *Título:* ${title}\n` +
                      `🎶 *Tipo:* ${type.charAt(0).toUpperCase() + type.slice(1)}\n` +
                      `🎤 *Artista:* ${artists}\n` +
                      `📅 *Lanzamiento:* ${releaseDate}`;

      await conn.sendFile(m.chat, cover, 'cover.jpg', mensaje, m);

      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: music }, 
          fileName: `${title}.mp3`, 
          mimetype: 'audio/mpeg' 
        }, 
        { quoted: m }
      );

      await m.react('✅');
    } else {
      await m.react('❌');
      conn.reply(
        m.chat,
        '[ ᰔᩚ ] No se pudo obtener la música para este enlace o búsqueda.',
        m
      );
    }
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(
      m.chat,
      '[ ᰔᩚ ] Ocurrió un error al procesar tu solicitud.',
      m
    );
  }
};

handler.help = ['spotify *<url>*'];
handler.tags = ['dl'];
handler.command = /^(spotify|sp)$/i;
handler.register = true;

export default handler;






/* import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      '[ ᰔᩚ ] Ingresa el nombre o enlace para buscar en *Spotify*.\n\n' + 
      `Ejemplo:\n> *${usedPrefix + command}* https://open.spotify.com/track/123456789`,
      m
    );
  }

  await m.react('🕓');

  try {
    const response = await fetch(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(text)}`);
    const result = await response.json();

    if (result.status === 200 && result.result?.status) {
      const { title, artists, cover, music } = result.result;

      const mensaje = `🎵 *Título*: ${title}\n🎤 *Artista*: ${artists}\n📅 *Lanzamiento*: ${result.result.releaseDate}`;

      await conn.sendFile(m.chat, cover, 'cover.jpg', mensaje, m);

      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: music }, 
          fileName: `${title}.mp3`, 
          mimetype: 'audio/mpeg' 
        }, 
        { quoted: m }
      );

      await m.react('✅');
    } else {
      await m.react('❌');
      conn.reply(
        m.chat,
        '[ ᰔᩚ ] No se pudo obtener la música para este enlace o búsqueda.',
        m
      );
    }
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(
      m.chat,
      '[ ᰔᩚ ] Ocurrió un error al procesar tu solicitud.',
      m
    );
  }
};

handler.help = ['spotify *<url>*'];
handler.tags = ['dl'];
handler.command = /^(spotify|sp)$/i;
handler.register = true;

export default handler; */