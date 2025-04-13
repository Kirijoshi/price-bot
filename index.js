const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load saved data
let data = {};
const dataFile = "data.json";

if (fs.existsSync(dataFile)) {
  const raw = fs.readFileSync(dataFile);
  data = JSON.parse(raw);
} else {
  data = {};
}

// Default vehicle data
const defaultVehicles = {
  torpedo: { price: 17, emoji: "🚗", quantity: 0 },
  javelin: { price: 15, emoji: "🚀", quantity: 0 },
  beignet: { price: 12.5, emoji: "🍩", quantity: 0 },
  celsior: { price: 11.5, emoji: "🚗", quantity: 0 },
  "proto-08": { price: 10.5, emoji: "🏁", quantity: 0 },
  arachnid: { price: 8.0, emoji: "🕷️", quantity: 0 },
  icebreaker: { price: 7.0, emoji: "❄️", quantity: 0 },
  "beam hybrid": { price: 7.0, emoji: "⚡", quantity: 0 },
  "banana car": { price: 5.5, emoji: "🍌", quantity: 0 },
  power1: { price: 5.2, emoji: "🔋", quantity: 0 },
  molten: { price: 5.2, emoji: "🔥", quantity: 0 },
  raptor: { price: 4.8, emoji: "🦖", quantity: 0 },
  "crew capsule": { price: 4.5, emoji: "🚀", quantity: 0 },
  bandit: { price: 4.0, emoji: "🏴‍☠️", quantity: 0 },
  parisian: { price: 3.8, emoji: "🗼", quantity: 0 },
  aperture: { price: 3.5, emoji: "📸", quantity: 0 },
  rattler: { price: 3.2, emoji: "🐍", quantity: 0 },
  shogun: { price: 3.0, emoji: "⚔️", quantity: 0 },
  scorpion: { price: 2.8, emoji: "🦂", quantity: 0 },
  carbonara: { price: 2.5, emoji: "🍝", quantity: 0 },
  volt: { price: 2.3, emoji: "⚡", quantity: 0 },
  goliath: { price: 1.8, emoji: "🚚", quantity: 0 },
  jb8: { price: 1.8, emoji: "🎭", quantity: 0 },
  macaron: { price: 1.8, emoji: "🍬", quantity: 0 },
  torero: { price: 1.6, emoji: "🐂", quantity: 0 },
  brulee: { price: 1.6, emoji: "🏎️", quantity: 0 },
  snake: { price: 1.4, emoji: "🐍", quantity: 0 },
  "tiny toy": { price: 1.4, emoji: "🧸", quantity: 0 },
  wedge: { price: 1.2, emoji: "🔺", quantity: 0 },
  concept: { price: 1.2, emoji: "🚀", quantity: 0 },
  poseidon: { price: 1.2, emoji: "🌊", quantity: 0 },
  airtail: { price: 1.0, emoji: "✈️", quantity: 0 },
};

// Fill in missing data
for (const key in defaultVehicles) {
  if (!data[key]) {
    data[key] = defaultVehicles[key];
  }
}

function saveData() {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Command handler
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  // !prices
  if (message.content === "!prices") {
    let msg = "**🚗 Vehicle Price List:**\n\n";
    for (const [name, info] of Object.entries(data)) {
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      msg += `${info.emoji} **${label}** – $${info.price} (${info.quantity})\n`;
    }
    message.channel.send(msg);
  }

  // !editprice <vehicle> <price>
  if (message.content.startsWith("!editprice")) {
    const parts = message.content.split(" ");
    if (parts.length !== 3) return message.reply("❌ Usage: `!editprice <vehicle> <price>`");

    const name = parts[1].toLowerCase();
    const price = parseFloat(parts[2]);
    if (!data[name]) return message.reply("❌ Vehicle not found.");
    if (isNaN(price)) return message.reply("❌ Invalid price.");

    data[name].price = price;
    saveData();
    message.reply(`✅ Updated price of **${name}** to $${price}`);
  }

  // !edit<vehicle> <quantity>
  if (message.content.startsWith("!edit")) {
    const match = message.content.match(/^!edit([a-z0-9 -]+)\s+(\d+)$/i);
    if (!match) return;

    const vehicle = match[1].toLowerCase();
    const quantity = parseInt(match[2]);
    if (!data[vehicle]) return message.reply("❌ Vehicle not found.");

    data[vehicle].quantity = quantity;
    saveData();
    message.reply(`✅ Set quantity of **${vehicle}** to ${quantity}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
