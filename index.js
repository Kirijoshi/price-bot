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

// Vehicle data
const vehicleData = {
  torpedo: { price: 17.0, available: ":white_check_mark:", emoji: ":red_car:" },
  javelin: { price: 15, available: ":white_check_mark:", emoji: ":rocket:" },
  beignet: { price: 12.5, available: ":white_check_mark:", emoji: ":doughnut:" },
  celsior: { price: 11.5, available: ":x:", emoji: ":red_car:" },
  "proto-08": { price: 10.5, available: ":white_check_mark:", emoji: ":checkered_flag:" },
  arachnid: { price: 8.0, available: ":x:", emoji: ":spider:" },
  icebreaker: { price: 7.0, available: ":white_check_mark:", emoji: ":snowflake:" },
  "beam hybrid": { price: 7.0, available: ":x:", emoji: ":zap:" },
  "banana car": { price: 5.5, available: ":x:", emoji: ":banana:" },
  power1: { price: 5.2, available: ":white_check_mark:", emoji: ":battery:" },
  molten: { price: 5.2, available: ":white_check_mark:", emoji: ":fire:" },
  raptor: { price: 4.8, available: ":white_check_mark:", emoji: ":t_rex:" },
  "crew capsule": { price: 4.5, available: ":white_check_mark:", emoji: ":rocket:" },
  bandit: { price: 4.0, available: ":white_check_mark:", emoji: ":pirate_flag:" },
  parisian: { price: 3.8, available: ":white_check_mark:", emoji: ":tokyo_tower:" },
  aperture: { price: 3.5, available: ":white_check_mark:", emoji: ":camera_with_flash:" },
  rattler: { price: 3.2, available: ":white_check_mark:", emoji: ":snake:" },
  shogun: { price: 3.0, available: ":white_check_mark:", emoji: ":crossed_swords:" },
  scorpion: { price: 2.8, available: ":white_check_mark:", emoji: ":scorpion:" },
  carbonara: { price: 2.5, available: ":white_check_mark:", emoji: ":spaghetti:" },
  volt: { price: 2.3, available: ":x:", emoji: ":zap:" },
  goliath: { price: 1.8, available: ":white_check_mark:", emoji: ":truck:" },
  jb8: { price: 1.8, available: ":x:", emoji: ":performing_arts:" },
  macaron: { price: 1.8, available: ":white_check_mark:", emoji: ":candy:" },
  torero: { price: 1.6, available: ":white_check_mark:", emoji: ":ox:" },
  brulee: { price: 1.6, available: ":white_check_mark:", emoji: ":race_car:" },
  snake: { price: 1.4, available: ":white_check_mark:", emoji: ":snake:" },
  "tiny toy": { price: 1.4, available: ":white_check_mark:", emoji: ":teddy_bear:" },
  wedge: { price: 1.2, available: ":white_check_mark:", emoji: ":small_red_triangle:" },
  concept: { price: 1.2, available: ":white_check_mark:", emoji: ":rocket:" },
  poseidon: { price: 1.2, available: ":white_check_mark:", emoji: ":ocean:" },
  airtail: { price: 1.0, available: ":white_check_mark:", emoji: ":airplane:" },
};

// Ordered list of vehicles
const vehicleOrder = Object.keys(vehicleData);

// Command listener
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();

  // Show prices
  if (content === "!prices") {
    let priceMessage = "**# :red_car: Jailbreak Vehicle Price List :red_car:**\n\n";

    vehicleOrder.forEach((vehicle) => {
      const data = vehicleData[vehicle];
      const name = vehicle.charAt(0).toUpperCase() + vehicle.slice(1);
      priceMessage += `${data.emoji} ${name} – $${data.price} ............... ${data.available}\n`;
    });

    return message.channel.send(priceMessage);
  }

  // Edit price
  if (content.startsWith("!editprices")) {
    const args = content.split(" ").slice(1);
    if (args.length < 2) {
      return message.reply("Usage: `!editprices <vehicle name> <price>`");
    }

    const name = args.slice(0, -1).join(" ").toLowerCase();
    const newPrice = parseFloat(args[args.length - 1]);

    if (!vehicleData[name]) {
      return message.reply(`Vehicle "${name}" not found.`);
    }

    if (isNaN(newPrice)) {
      return message.reply("Please provide a valid number for the price.");
    }

    vehicleData[name].price = newPrice;
    return message.reply(
      `✅ Updated price of **${name}** to **$${newPrice}**`
    );
  }
});

client.login(process.env.DISCORD_TOKEN);