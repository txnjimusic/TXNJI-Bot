module.exports = async (member) => {

const channel = member.guild.channels.cache.find(
  ch => ch.name === "🛬〢arrivals-and-goodbyes"
);

 if(channel){
  channel.send(`👋 ${member.user.username} left from the server.`);
 }

};