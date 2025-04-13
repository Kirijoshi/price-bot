const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Path to the vehicles JSON file
const vehiclesFile = './vehicles.json';

// Initial vehicle data (with emojis and prices, as you requested)
const initialVehicles = {
  "Torpedo": { emoji: "🚗", price: 17, quantity: 0 },
  "Javelin": { emoji: "🚀", price: 15, quantity: 0 },
  "Beignet": { emoji: "🍩", price: 13.5, quantity: 0 },
  "Celsior": { emoji: "🚘", price: 12, quantity: 0 },
  "Proto-8": { emoji: "🤖", price: 11, quantity: 0 },
  "Arachnid": { emoji: "🕷️", price: 10, quantity: 0 },
  "Beam Hybrid": { emoji: "🔋", price: 9.5, quantity: 0 },
  "Icebreaker": { emoji: "❄️", price: 9, quantity: 0 },
  "Banana": { emoji: "🍌", price: 8.5, quantity: 0 },
  "Power-1": { emoji: "⚡", price: 8, quantity: 0 },
  "Molten M12": { emoji: "🔥", price: 8, quantity: 0 },
  "Raptor": { emoji: "🦖", price: 7.5, quantity: 0 },
  "Crew Capsule": { emoji: "🚀", price: 7, quantity: 0 },
  "Bantid": { emoji: "🐝", price: 6.5, quantity: 0 },
  "Parisian": { emoji: "🗼", price: 6, quantity: 0 },
  "Aperture": { emoji: "🔲", price: 5.5, quantity: 0 },
  "Rattler": { emoji: "🐍", price: 5, quantity: 0 },
  "Shogun": { emoji: "🥷", price: 4.5, quantity: 0 },
  "Scorpion": { emoji: "🦂", price: 4, quantity: 0 },
  "Carbonara": { emoji: "🍝", price: 3.5, quantity: 0 },
  "Volt 4x4": { emoji: "🔌", price: 3, quantity: 0 },
  "Goliath": { emoji: "💪", price: 2.5, quantity: 0 },
  "Macaron": { emoji: "🍪", price: 2.5, quantity: 0 },
  "JB8": { emoji: "🎮", price: 2.5, quantity: 0 },
  "Torero": { emoji: "🦸", price: 2.25, quantity: 0 },
  "Brûlée": { emoji: "🍮", price: 2.25, quantity: 0 },
  "Snake": { emoji: "🐍", price: 2, quantity: 0 },
  "Iceborn": { emoji: "❄️", price: 2, quantity: 0 },
  "Airtail": { emoji: "✈️", price: 1.75, quantity: 0 },
  "Poseidon": { emoji: "🌊", price: 1.5, quantity: 0 },
  "Bloxy": { emoji: "🎮", price: 1.5, quantity: 0 },
  "Wedge": { emoji: "🧱", price: 1.5, quantity: 0 },
  "Jack Rabbit": { emoji: "🐇", price: 1.5, quantity: 0 },
  "Stormrider": { emoji: "🌩️", price: 1.25, quantity: 0 },
  "Longhorn": { emoji: "🐂", price: 1.25, quantity: 0 },
  "Frost Crawler": { emoji: "❄️", price: 1, quantity: 0 },
  "Og Monster": { emoji: "👹", price: 1, quantity: 0 },
  "Striker": { emoji: "🥊", price: 0.75, quantity: 0 },
  "Megalodon": { emoji: "🦈", price: 0.75, quantity: 0 },
  "Shell Classic": { emoji: "🐚", price: 0.75, quantity: 0 },
  "Maverick": { emoji: "🦅", price: 0.75, quantity: 0 },
};

// Load vehicle data from the JSON file
function loadVehicleData() {
  try {
    if (!fs.existsSync(vehiclesFile)) {
      // If the file doesn't exist, create it with initial data
      saveVehicleData(initialVehicles);
      return initialVehicles;
    }
    const rawData = fs.readFileSync(vehiclesFile);
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading vehicles data:', err);
    return initialVehicles; // If there's an error, use initial data
  }
}

// Save the updated vehicle data to the JSON file
function saveVehicleData(data) {
  try {
    fs.writeFileSync(vehiclesFile, JSON.stringify(data, null, 2));
    console.log('Vehicle data saved successfully!');
  } catch (err) {
    console.error('Error saving vehicles data:', err);
  }
}

// Bot ready event
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Command to show vehicle prices and quantities
client.on('messageCreate', async message => {
  if (message.content.toLowerCase() === '!prices') {
    const vehicles = loadVehicleData();
    let priceList = '';

    // Iterate over each vehicle and build the price list message
    for (const [name, data] of Object.entries(vehicles)) {
      priceList += `${data.emoji} **${name}:** $${data.price} | Quantity: ${data.quantity}\n`;
    }

    // Send the formatted price list message
    await message.delete(); // Delete the !prices command message
    message.channel.send(priceList); // Send the updated vehicle list
  }

  // Command to edit vehicle quantity
  if (message.content.toLowerCase().startsWith('!editquantity')) {
    const [_, vehicleName, quantity] = message.content.split(' ');

    const vehicles = loadVehicleData();

    // Check if the vehicle exists, case-insensitive
    const vehicleKey = Object.keys(vehicles).find(key => key.toLowerCase() === vehicleName.toLowerCase());

    if (vehicleKey) {
      vehicles[vehicleKey].quantity = parseInt(quantity, 10);
      saveVehicleData(vehicles);
      await message.delete(); // Delete the !editquantity command message

      // Send confirmation message with updated quantity
      const updatedVehicle = vehicles[vehicleKey];
      message.channel.send(`${updatedVehicle.emoji} **${vehicleKey}:** $${updatedVehicle.price} | Quantity: ${updatedVehicle.quantity}`);
    } else {
      message.channel.send('Invalid vehicle name');
    }
  }

  // Command to edit vehicle price
  if (message.content.toLowerCase().startsWith('!editprices')) {
    const [_, vehicleName, price] = message.content.split(' ');

    const vehicles = loadVehicleData();

    // Check if the vehicle exists, case-insensitive
    const vehicleKey = Object.keys(vehicles).find(key => key.toLowerCase() === vehicleName.toLowerCase());

    if (vehicleKey) {
      vehicles[vehicleKey].price = parseFloat(price);
      saveVehicleData(vehicles);
      await message.delete(); // Delete the !editprices command message

      // Send confirmation message with updated price
      const updatedVehicle = vehicles[vehicleKey];
      message.channel.send(`${updatedVehicle.emoji} **${vehicleKey}:** $${updatedVehicle.price} | Quantity: ${updatedVehicle.quantity}`);
    } else {
      message.channel.send('Invalid vehicle name');
    }
  }
});

// Log in to Discord with your app's token
client.login(process.env.BOT_TOKEN);
