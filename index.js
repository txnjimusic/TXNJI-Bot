require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const welcome = require("./events/welcome");
const goodbye = require("./events/goodbye");

const client = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers
 ]
});

client.once("ready", () => {
  console.log(`Bot online als ${client.user.tag}`);

  // -----------------------------
  // TEST WELCOME UND GOODBYE
  // -----------------------------

  // Test-Mitglied erstellen
  const testMember = {
    user: {
      username: "TestUser",
      displayAvatarURL: () => "https://i.imgur.com/AfFp7pu.png" // Testavatar
    },
    guild: client.guilds.cache.first() // nimmt den ersten Server
  };

  // Test-Welcome senden
  welcome(testMember);

  // Test-Goodbye senden
  goodbye(testMember);
});

// Echte Member-Events
client.on("guildMemberAdd", member => {
 welcome(member);
});

client.on("guildMemberRemove", member => {
 goodbye(member);
});

client.login(process.env.TOKEN);