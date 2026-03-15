const { SlashCommandBuilder } = require("discord.js");

module.exports = [

{
 data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Test if the bot is working"),

 async execute(interaction){
  await interaction.reply("TXNJI Bot is active🔥");
 }
},

{
 data: new SlashCommandBuilder()
  .setName("socials")
  .setDescription("Show TXNJI socials"),

 async execute(interaction){

  await interaction.reply(
`🌐 **TXNJI Socials**

🎵 Spotify
https://open.spotify.com/artist/0jnIN9JZhwTN59Rnj1MyNS?si=hMlsGGj9Ski2TjxLuVEnew

▶ YouTube
https://youtube.com/@txnji

🎵 TikTok
https://www.tiktok.com/@x_txnji

📸 Instagram
https://www.instagram.com/txnji_music/`
  );

 }
},

{
 data: new SlashCommandBuilder()
  .setName("latestvideo")
  .setDescription("Shows the latest YouTube video"),

 async execute(interaction){

  await interaction.reply(
`🎬 **Latest TXNJI Video**

https://youtube.com/@txnji`
  );

 }

}

];