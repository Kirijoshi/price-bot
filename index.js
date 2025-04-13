const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.once('ready', () => {
  console.log('Bot is online');
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!hello') {
    console.log('Sending Hello World!');
    message.channel.send('Hello World!');
  }
});

client.login(process.env.DISCORD_TOKEN);
