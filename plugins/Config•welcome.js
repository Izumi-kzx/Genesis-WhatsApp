import { WAMessageStubType } from '@whiskeysockets/baileys';  
import fetch from 'node-fetch';  
import { welcomeImage } from 'ultrax';  

export async function before(m, { conn, participants, groupMetadata }) {  
  if (!m.messageStubType || !m.isGroup) return !0;  

  let chat = global.db.data.chats[m.chat];  
  let web = 'https://genesis-support.vercel.app/';  
  let webb = 'https://izumikzx.vercel.app/';  
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';  
  let user = global.db.data.users[who];  
  let userName = user ? user.name : await conn.getName(who);  

  const getUserAvatar = async () => {  
    try {  
      return await conn.profilePictureUrl(m.messageStubParameters[0], 'image');  
    } catch (err) {  
      return 'https://i.ibb.co/cFzgdNw/file.jpg';  
    }  
  };  

const generateImage = async (title, description) => { 
  const bg = 'https://imgur.com/okIR1iY.png';    
  const avatar = userAvatar;    
  const subtitle = member.user.tag;    
  const footer = `You're the th member`;    
  const color = '#ffffff';    
  const channel = member.guild.channels.cache.get('716220553391767569');    
  const options = {    
    font: "sans-serif",    
    attachmentName: `welcome-${member.id}`,
    title_fontSize: 80,  
    subtitle_fontSize: 50,  
    footer_fontSize: 30  
  };  

  return await welcomeImage(bg, userAvatar, title, subtitle, footer, color, options);  
};

  if (chat.welcome && m.messageStubType == 27) {  
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;  

    let img = await generateImage('¡BIENVENIDO!', '¡Hola Bienvenido al grupo!');  

    await conn.sendAi(m.chat, botname, dev, bienvenida, img, img, web, null);  
  }  

  if (chat.welcome && m.messageStubType == 28) {  
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;  

    let img = await generateImage('¡ADIOS!', '¡Hasta pronto Usuario!');  

    await conn.sendAi(m.chat, botname, dev, bye, img, img, webb, null);  
  }  

  if (chat.welcome && m.messageStubType == 32) {  
    let kick = `❀ *Fue expulsado* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;  

    let img = await generateImage('EXPULSADO', '¡fue expulsado del grupo.!');  

    await conn.sendAi(m.chat, botname, dev, kick, img, img, web, null);  
  }  
} 