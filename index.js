require("dotenv").config();

const express = require("express");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const welcome = require("./events/welcome");
const goodbye = require("./events/goodbye");

const commands = require("./commands/general");

const client = new Client({
 intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers
 ]
});

client.commands = new Collection();

for (const command of commands){
 client.commands.set(command.data.name, command);
}

client.once("clientReady", () => {
 console.log(`Bot online als ${client.user.tag}`);
});

client.on("guildMemberAdd", member => {
 welcome(member);
});

client.on("guildMemberRemove", member => {
 goodbye(member);
});

client.on("interactionCreate", async interaction => {

 if(!interaction.isChatInputCommand()) return;

 const command = client.commands.get(interaction.commandName);

 if(!command) return;

 try{
  await command.execute(interaction);
 }catch(error){
  console.error(error);
  await interaction.reply({content:"Error executing command", ephemeral:true});
 }

});

client.login(process.env.TOKEN);


/* render port fix */

const app = express();
app.get("/", (req,res)=>res.send("Bot running"));
app.listen(3000, ()=>console.log("Web server running"));