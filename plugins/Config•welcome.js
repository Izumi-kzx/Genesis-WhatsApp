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
  let member = participants.find(p => p.id === who);

  const getUserAvatar = async () => {  
    try {  
      return await conn.profilePictureUrl(m.messageStubParameters[0], 'image');  
    } catch (err) {  
      return 'https://i.ibb.co/cFzgdNw/file.jpg';  
    }  
  };  

const generateImage = async (title, description, userAvatar, subtitle) => { 
  const bg = 'https://imgur.com/okIR1iY.png';    
  const footer = `You're the th member`;    
  const color = '#ffffff';    
  const options = {    
    font: "sans-serif",    
    attachmentName: `welcome-${who}`,
    title_fontSize: 80,  
    subtitle_fontSize: 50,  
    footer_fontSize: 30  
  };  

  return await welcomeImage(bg, userAvatar, title, subtitle, footer, color, options);  
};

  if (chat.welcome && m.messageStubType == 27) {  
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;  

    let userAvatar = await getUserAvatar();
    let subtitle = member ? `@${who.split('@')[0]}` : 'Nuevo usuario';
    let img = await generateImage('¡BIENVENIDO!', '¡Hola Bienvenido al grupo!', userAvatar, subtitle);  

    await conn.sendAi(m.chat, botname, dev, bienvenida, img, img, web, null);  
  }  

  if (chat.welcome && m.messageStubType == 28) {  
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;  

    let userAvatar = await getUserAvatar();
    let subtitle = member ? `@${who.split('@')[0]}` : 'Usuario saliente';
    let img = await generateImage('¡ADIOS!', '¡Hasta pronto Usuario!', userAvatar, subtitle);  

    await conn.sendAi(m.chat, botname, dev, bye, img, img, webb, null);  
  }  

  if (chat.welcome && m.messageStubType == 32) {  
    let kick = `❀ *Fue expulsado* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;  

    let userAvatar = await getUserAvatar();
    let subtitle = member ? `@${who.split('@')[0]}` : 'Usuario expulsado';
    let img = await generateImage('EXPULSADO', '¡fue expulsado del grupo.!', userAvatar, subtitle);  

    await conn.sendAi(m.chat, botname, dev, kick, img, img, web, null);  
  }  
}


He corregido el código para definir member y asegurarme de que subtitle se pase correctamente a generateImage. Ahora no deberías recibir el error de parámetro faltante. Pruébalo y dime si hay algún otro problema.

