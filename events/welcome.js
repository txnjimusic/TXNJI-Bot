const Canvas = require("canvas");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (member) => {
  // Canvas anlegen
  const canvas = Canvas.createCanvas(800, 300);
  const ctx = canvas.getContext("2d");

  // Hintergrundbild laden
  const background = await Canvas.loadImage("./images/welcome-background.png");

  // Optional: abgerundete Ecken für das ganze Bild
  const borderRadius = 20;

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Canvas als Clip für abgerundete Ecken
  roundRect(ctx, 0, 0, canvas.width, canvas.height, borderRadius);
  ctx.clip();

  // Bild zeichnen
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Leichte Umrandung (Border)
  ctx.lineWidth = 8;                 // Dicke der Linie
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; // Weiß, halbtransparent
  roundRect(ctx, 0, 0, canvas.width, canvas.height, borderRadius);
  ctx.stroke();

  // Attachment erstellen
  const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "welcome.png" });

  // Channel finden
  const channel = member.guild.channels.cache.find(ch => ch.name === "🛬〢arrivals-and-goodbyes");

  if (channel) {
    channel.send({
      content: `🎉 Welcome ${member.user.username} on TXNJI OFFICIAL! ❤️`,
      files: [attachment]
    });
  }
};