require("dotenv").config();

const { REST, Routes } = require("discord.js");
const commands = require("./commands/general");

const commandData = commands.map(c => c.data.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {

 try{

  console.log("Registering slash commands...");

  await rest.put(
   Routes.applicationCommands(process.env.CLIENT_ID),
   { body: commandData }
  );

  console.log("Commands registered.");

 }catch(error){
  console.error(error);
 }

})();