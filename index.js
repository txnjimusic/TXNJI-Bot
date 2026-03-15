require("dotenv").config();

const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const welcome = require("./events/welcome");
const goodbye = require("./events/goodbye");

// ----------------------
// Express Webserver
// ----------------------

const app = express();

app.get("/", (req, res) => {
  res.send("TXNJI Bot läuft");
});

// WICHTIG: Render benutzt process.env.PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Webserver läuft auf Port ${PORT}`);
});

// ----------------------
// Discord Bot
// ----------------------

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("clientReady", () => {
  console.log(`Bot online als ${client.user.tag}`);
});

// Welcome
client.on("guildMemberAdd", member => {
  welcome(member);
});

// Goodbye
client.on("guildMemberRemove", member => {
  goodbye(member);
});

client.login(process.env.TOKEN);