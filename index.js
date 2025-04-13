const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("Bot has logged in successfully!");
});

client.on("messageCreate", (message) => {
  // Check if the message is from the bot itself
  if (message.author.bot) return;

  // Command handling
  if (message.content.toLowerCase() === "!hi") {
    message.channel.send("Hi");
  }
});

client.login("YOUR_BOT_TOKEN"); // Make sure to replace this with your actual bot token
