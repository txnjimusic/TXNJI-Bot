require("dotenv").config();

const express = require("express");
const app = express();

const { Client, GatewayIntentBits } = require("discord.js");

const welcome = require("./events/welcome");
const goodbye = require("./events/goodbye");

// -----------------------------
// Webserver (für Render notwendig)
// -----------------------------

app.get("/", (req, res) => {
  res.send("TXNJI Bot läuft");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Webserver läuft auf Port ${PORT}`);
});

// -----------------------------
// Discord Bot
// -----------------------------

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("clientReady", () => {
  console.log(`Bot online als ${client.user.tag}`);
});

// Welcome Nachricht
client.on("guildMemberAdd", member => {
  welcome(member);
});

// Goodbye Nachricht
client.on("guildMemberRemove", member => {
  goodbye(member);
});

// Login
client.login(process.env.TOKEN);