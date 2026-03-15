require('dotenv').config();

const express = require("express");
const app = express();

const { Client, GatewayIntentBits } = require("discord.js");

const welcome = require("./events/welcome");
const goodbye = require("./events/goodbye");

// --------------------------------
// Webserver für Render (gegen Timeout)
// --------------------------------

app.get("/", (req, res) => {
  res.send("TXNJI Bot läuft");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Webserver läuft auf Port ${PORT}`);
});
// --------------------------------
// Discord Bot
// --------------------------------

const client = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers
 ]
});

// Bot gestartet
client.once("clientReady", () => {
 console.log(`Bot online als ${client.user.tag}`);
});

// Welcome Event
client.on("guildMemberAdd", member => {
 welcome(member);
});

// Goodbye Event
client.on("guildMemberRemove", member => {
 goodbye(member);
});

// Bot Login
client.login(process.env.TOKEN);