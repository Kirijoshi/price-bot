const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// File to store prices
const DATA_FILE = "prices.json";

// Default vehicle data
let vehicleData = {
  torpedo: { price: 17.0, emoji: "🚗", available: "✅" },
  javelin: { price: 15.0, emoji: "🚀", available: "✅" },
  beignet: { price: 12.5, emoji: "🍩", available: "✅" },
};

// Order of vehicles
const vehicleOrder = ["torpedo", "javelin", "beignet"];

// Load data from file if it exists
if (fs.existsSync(DATA_FILE)) {
  try {
    const fileContent = fs.readFileSync(DATA_FILE);
    vehicleData = JSON.parse(fileContent);
  } catch (err) {
    console.error("Failed to load vehicle data:", err);
  }
}

// Save data to file
function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(vehicleData, null, 2));
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === "!hello") {
    message.channel.send("Hello World!");
  }

  if (command === "!prices") {
    let priceMessage = "**# 🚗 Jailbreak Vehicle Price List 🚗**\n\n";
    vehicleOrder.forEach((name) => {
      const v = vehicleData[name];
      priceMessage += `${v.emoji} ${name.charAt(0).toUpperCase() + name.slice(1)} – $${v.price} ............... ${v.available}\n`;
    });
    message.channel.send(priceMessage);
  }

  if (command === "!editprices") {
    const [name, newPrice] = args;
    if (!vehicleData[name]) {
      return message.channel.send(`❌ Vehicle "${name}" not found.`);
    }
    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum)) {
      return message.channel.send("❌ Invalid price.");
    }
    vehicleData[name].price = priceNum;
    saveData();
    message.channel.send(`✅ Updated price of ${name} to $${priceNum}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
