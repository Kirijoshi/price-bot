const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if the message content is "!hello" (case-insensitive)
  if (message.content.trim().toLowerCase() === "!hello") {
    message.channel.send("Hello World!");
  }
});

// Replace process.env.DISCORD_TOKEN with your token if you're not using environment variables
client.login(process.env.DISCORD_TOKEN).catch(console.error);
