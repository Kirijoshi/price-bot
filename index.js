const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Required to read message content
  ],
});

client.once("ready", () => {
  console.log("Bot is online and ready!"); // Logs when the bot starts
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // Ignore bot messages

  if (message.content === "!hello") {
    message.channel.send("Hello World!"); // Sends a message when !hello is typed
  }
});

// Login with your bot's token
client.login(process.env.DISCORD_TOKEN).catch(console.error);
