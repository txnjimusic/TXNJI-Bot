const { SlashCommandBuilder } = require("discord.js");
const Parser = require("rss-parser");

const parser = new Parser();

// ✅ HIER DEINE CHANNEL ID ALS STRING!
const CHANNEL_ID = "UCCE-onWdjkkQqjxr8eF0wzg";

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
https://www.youtube.com/channel/${CHANNEL_ID}

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

   const video = feed.items[0];

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