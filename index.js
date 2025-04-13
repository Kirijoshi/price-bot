const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Vehicle data with price and quantity
const vehicleData = {
  torpedo: { price: 45, quantity: 0 },
  javelin: { price: 38, quantity: 0 },
  beignet: { price: 31.5, quantity: 0 },
  celsior: { price: 30, quantity: 0 },
  "proto-8": { price: 27, quantity: 0 },
  arachnid: { price: 20, quantity: 0 },
  "beam hybrid": { price: 17.5, quantity: 0 },
  icebreaker: { price: 17, quantity: 0 },
  banana: { price: 13, quantity: 0 },
  "power-1": { price: 12, quantity: 0 },
  "molten m12": { price: 12, quantity: 0 },
  raptor: { price: 11, quantity: 0 },
  "crew capsule": { price: 10, quantity: 0 },
  bantid: { price: 9, quantity: 0 },
  parisian: { price: 8, quantity: 0 },
  aperture: { price: 7.5, quantity: 0 },
  rattler: { price: 7, quantity: 0 },
  shogun: { price: 6.5, quantity: 0 },
  scorpion: { price: 6, quantity: 0 },
  carbonara: { price: 5.5, quantity: 0 },
  "volt 4x4": { price: 5, quantity: 0 },
  goliath: { price: 4, quantity: 0 },
  macaron: { price: 4, quantity: 0 },
  jb8: { price: 4, quantity: 0 },
  torero: { price: 3.5, quantity: 0 },
  brûlée: { price: 3.5, quantity: 0 },
  snake: { price: 3, quantity: 0 },
  iceborn: { price: 3, quantity: 0 },
  airtail: { price: 2.75, quantity: 0 },
  poseidon: { price: 2, quantity: 0 },
  bloxy: { price: 2, quantity: 0 },
  wedge: { price: 2, quantity: 0 },
  "jack rabbit": { price: 2, quantity: 0 },
  stormrider: { price: 1.75, quantity: 0 },
  longhorn: { price: 1.75, quantity: 0 },
  "frost crawler": { price: 1.5, quantity: 0 },
  "og monster": { price: 1.5, quantity: 0 },
  striker: { price: 1.25, quantity: 0 },
  megalodon: { price: 1.25, quantity: 0 },
  "shell classic": { price: 1.25, quantity: 0 },
  maverick: { price: 1.25, quantity: 0 },
  javelin: { price: 1, quantity: 0 },
};

// Maintain order
const vehicleOrder = Object.keys(vehicleData);

// !prices command
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // !prices
  if (message.content === "!prices") {
    let reply = "**📋 Jailbreak Vehicle Price List**\n\n";
    for (const vehicle of vehicleOrder) {
      const data = vehicleData[vehicle];
      const capName = vehicle.charAt(0).toUpperCase() + vehicle.slice(1);
      reply += `• ${capName} – $${data.price}M (Qty: ${data.quantity})\n`;
    }
    message.channel.send(reply);
  }

  // !edit<vehicle> <quantity>
  if (message.content.startsWith("!edit")) {
    const parts = message.content.slice(5).trim().split(" ");
    const vehicleName = parts.slice(0, -1).join(" ").toLowerCase();
    const quantity = parseInt(parts[parts.length - 1]);

    if (isNaN(quantity)) {
      return message.reply("❌ Invalid quantity.");
    }

    if (!vehicleData[vehicleName]) {
      return message.reply("❌ Vehicle not found.");
    }

    vehicleData[vehicleName].quantity = quantity;
    message.channel.send(`✅ Set quantity of ${vehicleName} to ${quantity}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
