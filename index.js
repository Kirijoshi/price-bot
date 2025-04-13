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
  torpedo: {
    price: 17.0,
    available: ":white_check_mark:",
    emoji: ":red_car:",
  },
  javelin: {
    price: 15,
    available: ":white_check_mark:",
    emoji: ":rocket:",
  },
  beignet: {
    price: 12.5,
    available: ":white_check_mark:",
    emoji: ":doughnut:",
  },
  celsior: {
    price: 11.5,
    available: ":x:",
    emoji: ":red_car:",
  },
  "proto-08": {
    price: 10.5,
    available: ":white_check_mark:",
    emoji: ":checkered_flag:",
  },
  arachnid: {
    price: 8.0,
    available: ":x:",
    emoji: ":spider:",
  },
  icebreaker: {
    price: 7.0,
    available: ":white_check_mark:",
    emoji: ":snowflake:",
  },
  "beam hybrid": {
    price: 7.0,
    available: ":x:",
    emoji: ":zap:",
  },
  "banana car": {
    price: 5.5,
    available: ":x:",
    emoji: ":banana:",
  },
  power1: {
    price: 5.2,
    available: ":white_check_mark:",
    emoji: ":battery:",
  },
  molten: {
    price: 5.2,
    available: ":white_check_mark:",
    emoji: ":fire:",
  },
  raptor: {
    price: 4.8,
    available: ":white_check_mark:",
    emoji: ":t_rex:",
  },
  "crew capsule": {
    price: 4.5,
    available: ":white_check_mark:",
    emoji: ":rocket:",
  },
  bandit: {
    price: 4.0,
    available: ":white_check_mark:",
    emoji: ":pirate_flag:",
  },
  parisian: {
    price: 3.8,
    available: ":white_check_mark:",
    emoji: ":tokyo_tower:",
  },
  aperture: {
    price: 3.5,
    available: ":white_check_mark:",
    emoji: ":camera_with_flash:",
  },
  rattler: {
    price: 3.2,
    available: ":white_check_mark:",
    emoji: ":snake:",
  },
  shogun: {
    price: 3.0,
    available: ":white_check_mark:",
    emoji: ":crossed_swords:",
  },
  scorpion: {
    price: 2.8,
    available: ":white_check_mark:",
    emoji: ":scorpion:",
  },
  carbonara: {
    price: 2.5,
    available: ":white_check_mark:",
    emoji: ":spaghetti:",
  },
  volt: {
    price: 2.3,
    available: ":x:",
    emoji: ":zap:",
  },
  goliath: {
    price: 1.8,
    available: ":white_check_mark:",
    emoji: ":truck:",
  },
  jb8: {
    price: 1.8,
    available: ":x:",
    emoji: ":performing_arts:",
  },
  macaron: {
    price: 1.8,
    available: ":white_check_mark:",
    emoji: ":candy:",
  },
  torero: {
    price: 1.6,
    available: ":white_check_mark:",
    emoji: ":ox:",
  },
  brulee: {
    price: 1.6,
    available: ":white_check_mark:",
    emoji: ":race_car:",
  },
  snake: {
    price: 1.4,
    available: ":white_check_mark:",
    emoji: ":snake:",
  },
  "tiny toy": {
    price: 1.4,
    available: ":white_check_mark:",
    emoji: ":teddy_bear:",
  },
  wedge: {
    price: 1.2,
    available: ":white_check_mark:",
    emoji: ":small_red_triangle:",
  },
  concept: {
    price: 1.2,
    available: ":white_check_mark:",
    emoji: ":rocket:",
  },
  poseidon: {
    price: 1.2,
    available: ":white_check_mark:",
    emoji: ":ocean:",
  },
  airtail: {
    price: 1.0,
    available: ":white_check_mark:",
    emoji: ":airplane:",
  },
};

// Order of the vehicles
const vehicleOrder = [
  "torpedo",
  "javelin",
  "beignet",
  "celsior",
  "proto-08",
  "arachnid",
  "icebreaker",
  "beam hybrid",
  "banana car",
  "power1",
  "molten",
  "raptor",
  "crew capsule",
  "bandit",
  "parisian",
  "aperture",
  "rattler",
  "shogun",
  "scorpion",
  "carbonara",
  "volt",
  "goliath",
  "jb8",
  "macaron",
  "torero",
  "brulee",
  "snake",
  "tiny toy",
  "wedge",
  "concept",
  "poseidon",
  "airtail",
];

// Cooldown time (in milliseconds)
const cooldownTime = 5000; // 5 seconds

client.on("messageCreate", async (message) => {
  // Prevent the bot from responding to its own messages
  if (message.author.bot) return;

  // Add a cooldown for the !prices command
  if (!message.cooldown) message.cooldown = {};

  if (message.content === "!prices") {
    // Check if the command was triggered too soon
    if (message.cooldown[message.author.id] && Date.now() - message.cooldown[message.author.id] < cooldownTime) {
      return;
    }

    // Set cooldown for this user
    message.cooldown[message.author.id] = Date.now();

    console.log("Prices command received"); // Debugging prices command

    let priceMessage = "**# :red_car: Jailbreak Vehicle Price List :red_car:**\n\n";

    // Loop through the vehicles in the specified order
    vehicleOrder.forEach((vehicle) => {
      const vehicleInfo = vehicleData[vehicle];
      priceMessage += `${vehicleInfo.emoji} ${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} – $${vehicleInfo.price} ............... ${vehicleInfo.available}\n`;
    });

    // Send the price message
    try {
      await message.channel.send(priceMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  // Command to update the price of a vehicle
  if (message.content.startsWith("!editprices")) {
    console.log("Edit prices command received"); // Debugging edit command
    // Check if the user has permission (e.g., is a co-owner)
    if (!message.member.roles.cache.some(role => role.name === '----Ownership----')) {
      return message.reply("You don't have permission to edit prices!");
    }

    const args = message.content.slice("!editprices".length).trim().split(" ");
    const vehicleName = args[0].toLowerCase();
    const newValue = args[1];

    if (!vehicleData[vehicleName]) {
      return message.reply("Vehicle not found!");
    }

    if (isNaN(newValue)) {
      return message.reply("Please provide a valid number for the price!");
    }

    // Update the price if it's a valid number
    vehicleData[vehicleName].price = parseFloat(newValue);

    // Send confirmation
    message.reply(`${vehicleName.charAt(0).toUpperCase() + vehicleName.slice(1)} price updated to $${newValue} successfully!`);
  }

  // Command to update availability of a vehicle
  if (message.content.startsWith("!editavailability")) {
    console.log("Edit availability command received"); // Debugging availability command
    const args = message.content.slice("!editavailability".length).trim().split(" ");
    const vehicleName = args[0].toLowerCase();
    const availabilityStatus = args[1].toLowerCase();

    if (!vehicleData[vehicleName]) {
      return message.reply("Vehicle not found!");
    }

    if (availabilityStatus === "yes") {
      vehicleData[vehicleName].available = ":white_check_mark:";  // Available
    } else if (availabilityStatus === "no") {
      vehicleData[vehicleName].available = ":x:";  // Not available
    } else {
      return message.reply("Please provide 'yes' or 'no' to indicate availability.");
    }

    // Send confirmation
    message.reply(`${vehicleName.charAt(0).toUpperCase() + vehicleName.slice(1)} availability updated to ${availabilityStatus === "yes" ? ":white_check_mark:" : ":x:"} successfully!`);
  }
});

// Login using the token from environment variables (Heroku)
client.login(process.env.DISCORD_TOKEN).catch(console.error);
