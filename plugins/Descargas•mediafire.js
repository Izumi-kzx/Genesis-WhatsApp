/* 
- Código Creado Por Izumi-kzx
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/
// *[ 🍟 SOUND CLOUD SEARCH ]*
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args.length) return conn.reply(m.chat, `🔍 *Por favor escribe una canción a buscar.*\nEjemplo: ${usedPrefix}${command} Avión Privado`, m)
  const query = args.join(' ')
  try {
    const response = await fetch(`https://api.agungny.my.id/api/soundclouds?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    
    if (!data.status || !data.result || data.result.length === 0) {
      return conn.reply(m.chat, `🚫 No se encontraron resultados para "${query}".`, m)
    }
    
    let txt = '*🎵 S E A R C H - S O U N D C L O U D*\n\n'
    data.result.forEach(track => {
      txt += `🎶 *Título*: ${track.title}\n`
      txt += `🔗 *Enlace*: ${track.url}\n\n---------------------------------------------------\n\n`
    })
    
    await conn.reply(m.chat, txt.trim(), m)
  } catch (error) {
    console.error(error)
    conn.reply(m.chat, '❌ Hubo un error al procesar la solicitud.', m)
  }
}
handler.command = ['soundcloudsearchtg']

export default handler