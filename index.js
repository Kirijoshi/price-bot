require("dotenv").config();
const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const DATA_FILE = "./vehicleData.json";

// Initial vehicle data
const defaultData = {
  torpedo: { price: 17, quantity: 0, emoji: "🚀" },
  javelin: { price: 15, quantity: 0, emoji: "🗡️" },
  beignet: { price: 13, quantity: 0, emoji: "🍩" },
  celsior: { price: 12.5, quantity: 0, emoji: "🚗" },
  proto8: { price: 11, quantity: 0, emoji: "🔧" },
  arachnid: { price: 10, quantity: 0, emoji: "🕷️" },
  banana: { price: 8, quantity: 0, emoji: "🍌" },
  volt: { price: 6, quantity: 0, emoji: "⚡" },
  brutale: { price: 4.5, quantity: 0, emoji: "🔥" },
};

// Load or initialize data
let vehicleData = defaultData;
if (fs.existsSync(DATA_FILE)) {
  try {
    vehicleData = JSON.parse(fs.readFileSync(DATA_FILE));
  } catch (err) {
    console.error("Error reading data file:", err);
  }
}

function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(vehicleData, null, 2));
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();
  const args = content.split(" ");

  // !prices command
  if (content === "!prices") {
    let response = "**📊 Vehicle Prices & Stock**\n";
    for (const [name, data] of Object.entries(vehicleData)) {
      response += `${data.emoji} **${name.charAt(0).toUpperCase() + name.slice(1)}** — 💰 $${data.price} — 🚗 ${data.quantity}\n`;
    }

    // Delete previous price messages by the bot
    const fetched = await message.channel.messages.fetch({ limit: 10 });
    const botMessages = fetched.filter(
      (m) => m.author.id === client.user.id && m.content.startsWith("**📊 Vehicle Prices")
    );
    for (const msg of botMessages.values()) {
      await msg.delete().catch(() => {});
    }

    await message.channel.send(response);
  }

  // !edit<vehiclename> <quantity>
  if (content.startsWith("!edit")) {
    const editCommand = content.split(" ")[0];
    const vehicleName = editCommand.slice(5).toLowerCase();
    const quantity = parseInt(args[1]);

    if (vehicleData[vehicleName] && !isNaN(quantity)) {
      vehicleData[vehicleName].quantity = quantity;
      saveData();

      // Delete user message and don't reply
      await message.delete().catch(() => {});
    }
  }

  // !editprices <vehicle> <price>
  if (args[0] === "!editprices") {
    const vehicle = args[1]?.toLowerCase();
    const price = parseFloat(args[2]);

    if (vehicleData[vehicle] && !isNaN(price)) {
      vehicleData[vehicle].price = price;
      saveData();

      await message.delete().catch(() => {});
    }
  }
});

client.once("ready", () => {
  console.log(`🟢 Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
