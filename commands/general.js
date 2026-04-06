const { SlashCommandBuilder } = require("discord.js");
const Parser = require("rss-parser");

const parser = new Parser();

// ✅ DEINE CHANNEL ID (die du gefunden hast)
const CHANNEL_ID = "UCCE-onWdjkkQqjxr8eF0wzg";

// ✅ Dein echter Kanal-Link (fix)
const CHANNEL_LINK = "https://www.youtube.com/@x_txnji";

module.exports = [

{
 data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Test if the bot is working"),

 async execute(interaction){
  await interaction.reply("🏓 Pong! Bot is working.");
 }
},

{
 data: new SlashCommandBuilder()
  .setName("socials")
  .setDescription("Show TXNJI socials"),

 async execute(interaction){

  await interaction.reply(
`🌐 **TXNJI Socials**

▶ YouTube
${CHANNEL_LINK}

🎵 TikTok
https://tiktok.com/@x_txnji

📸 Instagram
https://instagram.com/txnji_music`
  );

 }
},

{
 data: new SlashCommandBuilder()
  .setName("latestvideo")
  .setDescription("Shows the latest YouTube upload"),

 async execute(interaction){

  await interaction.reply("⏳ Loading latest video...");

  try {

   const feed = await parser.parseURL(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
   );

   // 🔥 Nur echte Videos / Shorts filtern
   const video = feed.items.find(item =>
     item.link.includes("watch?v=") || item.link.includes("shorts")
   );

   if (!video) {
    return interaction.editReply("❌ No videos found on this channel yet.");
   }

   await interaction.editReply(
`🎬 **Latest TXNJI Upload**

**${video.title}**
${video.link}`
   );

  } catch (err) {

   console.error(err);

   await interaction.editReply("❌ Could not fetch latest video.");

  }

 }

}

];