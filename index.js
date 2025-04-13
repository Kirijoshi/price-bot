const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Required to read message content
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Define vehicles and their properties
const vehicleData = {
  torpedo: { price: 17, emoji: ":red_car:", quantity: 0 },
  javelin: { price: 15, emoji: ":rocket:", quantity: 0 },
  beignet: { price: 12.5, emoji: ":doughnut:", quantity: 0 },
  celsior: { price: 11.5, emoji: ":red_car:", quantity: 0 },
  "proto-08": { price: 10.5, emoji: ":checkered_flag:", quantity: 0 },
  arachnid: { price: 8.0, emoji: ":spider:", quantity: 0 },
  icebreaker: { price: 7.0, emoji: ":snowflake:", quantity: 0 },
  "beam hybrid": { price: 7.0, emoji: ":zap:", quantity: 0 },
  "banana car": { price: 5.5, emoji: ":banana:", quantity: 0 },
  power1: { price: 5.2, emoji: ":battery:", quantity: 0 },
  molten: { price: 5.2, emoji: ":fire:", quantity: 0 },
  raptor: { price: 4.8, emoji: ":t_rex:", quantity: 0 },
  "crew capsule": { price: 4.5, emoji: ":rocket:", quantity: 0 },
  bandit: { price: 4.0, emoji: ":pirate_flag:", quantity: 0 },
  parisian: { price: 3.8, emoji: ":tokyo_tower:", quantity: 0 },
  aperture: { price: 3.5, emoji: ":camera_with_flash:", quantity: 0 },
  rattler: { price: 3.2, emoji: ":snake:", quantity: 0 },
  shogun: { price: 3.0, emoji: ":crossed_swords:", quantity: 0 },
  scorpion: { price: 2.8, emoji: ":scorpion:", quantity: 0 },
  carbonara: { price: 2.5, emoji: ":spaghetti:", quantity: 0 },
  volt: { price: 2.3, emoji: ":zap:", quantity: 0 },
  goliath: { price: 1.8, emoji: ":truck:", quantity: 0 },
  jb8: { price: 1.8, emoji: ":performing_arts:", quantity: 0 },
  macaron: { price: 1.8, emoji: ":candy:", quantity: 0 },
  torero: { price: 1.6, emoji: ":ox:", quantity: 0 },
  brulee: { price: 1.6, emoji: ":race_car:", quantity: 0 },
  snake: { price: 1.4, emoji: ":snake:", quantity: 0 },
  "tiny toy": { price: 1.4, emoji: ":teddy_bear:", quantity: 0 },
  wedge: { price: 1.2, emoji: ":small_red_triangle:", quantity: 0 },
  concept: { price: 1.2, emoji: ":rocket:", quantity: 0 },
  poseidon: { price: 1.2, emoji: ":ocean:", quantity: 0 },
  airtail: { price: 1.0, emoji: ":airplane:", quantity: 0 },
};

// Order of the vehicles
const vehicleOrder = [
  "torpedo", "javelin", "beignet", "celsior", "proto-08", "arachnid", "icebreaker", "beam hybrid", "banana car", "power1",
  "molten", "raptor", "crew capsule", "bandit", "parisian", "aperture", "rattler", "shogun", "scorpion", "carbonara",
  "volt", "goliath", "jb8", "macaron", "torero", "brulee", "snake", "tiny toy", "wedge", "concept", "poseidon", "airtail"
];

// Command to display prices and availability
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Command to display prices and availability
  if (message.content === "!prices") {
    let priceMessage = "**# :red_car: Jailbreak Vehicle Price List :red_car:**\n\n";

    // Loop through the vehicles in the specified order
    vehicleOrder.forEach((vehicle) => {
      const vehicleInfo = vehicleData[vehicle];
      priceMessage += `${vehicleInfo.emoji} ${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} – $${vehicleInfo.price} ............... ${vehicleInfo.quantity}\n`;
    });

    const sentMessage = await message.channel.send(priceMessage);

    // Delete the previous price message
    message.channel.messages.fetch({ limit: 2 }).then((messages) => {
      messages.forEach((msg) => {
        if (msg.author.bot && msg.id !== sentMessage.id) {
          msg.delete();
        }
      });
    });

    // Delete the user's command message
    message.delete();
  }

  // Command to update vehicle quantity
  const editPriceRegex = /^!edit([a-zA-Z0-9-]+) (\d+)$/;
  const match = message.content.match(editPriceRegex);

  if (match) {
    const vehicleName = match[1].toLowerCase();
    const quantity = parseInt(match[2], 10);

    if (vehicleData[vehicleName]) {
      vehicleData[vehicleName].quantity = quantity;
      message.channel.send(`✅ Updated quantity of ${vehicleName.charAt(0).toUpperCase() + vehicleName.slice(1)} to ${quantity}`);
      message.delete();
    } else {
      message.channel.send("🚫 Vehicle not found!");
      message.delete();
    }
  }
});

client.login(process.env.DISCORD_TOKEN).catch(console.error);
