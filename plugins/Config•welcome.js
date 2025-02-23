import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
const { Canvas } = require('discord-canvas');  // Cambiar la importación a CommonJS

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let chat = global.db.data.chats[m.chat];
  let wel = 'ＷＥＬＣＯＭＥ － ＵＳＥＲ';
  let bye = 'ＳＡＹＯＮＡＲＡ － ＵＳＥＲ';
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

  const generateImage = async (title, description, background) => {
    const userAvatar = await getUserAvatar();

    // Usar la clase Welcome o Leave según lo disponible en discord-canvas
    const image = await new Canvas.Welcome()  // Aquí puedes probar otras clases disponibles si Welcome no funciona
      .setUsername(userName)
      .setDiscriminator('0001')
      .setMemberCount(participants.length.toString())
      .setGuildName(groupMetadata.subject.trim())
      .setAvatar(userAvatar)
      .setColor("border", "#2a2e35")
      .setColor("username-box", "#2a2e35")
      .setColor("discriminator-box", "#2a2e35")
      .setColor("message-box", "#2a2e35")
      .setColor("title", "#2a2e35")
      .setColor("avatar", "#2a2e35")
      .setBackground(background)
      .toAttachment();

    return image;
  };

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    let img = await generateImage(
      '¡BIENVENIDO!',
      `¡Hola Bienvenido al grupo!`,
      'https://i.ibb.co/0cfqJLt/file.jpg'
    );

    await conn.sendFile(m.chat, img, 'thumbnail.jpg', bienvenida, m, null, web);
  }

  if (chat.welcome && m.messageStubType == 28) {
    let byeMessage = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Adiós...`;

    let img = await generateImage(
      '¡ADIOS!',
      `¡Hasta pronto Usuario!`,
      'https://i.ibb.co/cFzgdNw/file.jpg'
    );

    await conn.sendFile(m.chat, img, 'thumbnail.jpg', byeMessage, m, null, webb);
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kickMessage = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Adiós...`;

    let img = await generateImage(
      '¡ADIOS!',
      `¡Hasta pronto Usuario!`,
      'https://i.ibb.co/cFzgdNw/file.jpg'
    );

    await conn.sendFile(m.chat, img, 'thumbnail.jpg', kickMessage, m, null, web);
  }
}