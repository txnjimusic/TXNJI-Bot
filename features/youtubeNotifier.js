const Parser = require("rss-parser");
const cron = require("node-cron");

const parser = new Parser();

let lastVideo = "";

module.exports = (client) => {

cron.schedule("*/5 * * * *", async () => {

try {

const feed = await parser.parseURL(
"https://www.youtube.com/feeds/videos.xml?channel_id=UCCE-onWdjkkQqjxr8eF0wzg"
);

const video = feed.items[0];

if (video.id !== lastVideo) {

lastVideo = video.id;

const channel = client.channels.cache.find(
c => c.name === "🔔〢new-videos"
);

if (!channel) return;

channel.send({
content: "<1358897365880275105> <1482125642551267440>\n **New Video by TXNJI dropped!🎉**\n" + video.link
});

}

} catch (err) {
console.log("YouTube check error:", err);
}

});

};