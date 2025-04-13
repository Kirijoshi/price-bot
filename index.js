const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

const vehiclePrices = {
  Torpedo: 17,
  Javelin: 15,
  Beignet: 13,
  Celsior: 12,
  Proto_8: 10,
  Arachnid: 9,
  Beam_Hybrid: 8,
  Icebreaker: 7,
  Banana: 6,
  Power_1: 5,
  Molten_M12: 5,
  Raptor: 4,
  Crew_Capsule: 3,
  Bantid: 3,
  Parisian: 2,
  Aperture: 2,
  Rattler: 2,
  Shogun: 1,
  Scorpion: 1,
  Carbonara: 1,
  Volt_4x4: 1,
  Goliath: 1,
  Macaron: 1,
  JB8: 1,
  Torero: 1,
  Brûlée: 1,
  Snake: 1,
  Iceborn: 1,
  Airtail: 1,
  Poseidon: 1,
  Bloxy: 1,
  Wedge: 1,
  Jack_Rabbit: 1,
  Stormrider: 1,
  Longhorn: 1,
  Frost_Crawler: 1,
  Og_Monster: 1,
  Striker: 1,
  Megalodon: 1,
  Shell_Classic: 1,
  Maverick: 1,
  Javelin_1: 1,
};

let vehicleQuantities = {
  Torpedo: 0,
  Javelin: 0,
  Beignet: 0,
  Celsior: 0,
  Proto_8: 0,
  Arachnid: 0,
  Beam_Hybrid: 0,
  Icebreaker: 0,
  Banana: 0,
  Power_1: 0,
  Molten_M12: 0,
  Raptor: 0,
  Crew_Capsule: 0,
  Bantid: 0,
  Parisian: 0,
  Aperture: 0,
  Rattler: 0,
  Shogun: 0,
  Scorpion: 0,
  Carbonara: 0,
  Volt_4x4: 0,
  Goliath: 0,
  Macaron: 0,
  JB8: 0,
  Torero: 0,
  Brûlée: 0,
  Snake: 0,
  Iceborn: 0,
  Airtail: 0,
  Poseidon: 0,
  Bloxy: 0,
  Wedge: 0,
  Jack_Rabbit: 0,
  Stormrider: 0,
  Longhorn: 0,
  Frost_Crawler: 0,
  Og_Monster: 0,
  Striker: 0,
  Megalodon: 0,
  Shell_Classic: 0,
  Maverick: 0,
  Javelin_1: 0,
};

client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Delete !editprices message after updating prices
  if (message.content.startsWith('!editprices')) {
    const args = message.content.split(' ');
    const vehicleName = args[1];
    const newPrice = parseInt(args[2]);

    if (vehiclePrices[vehicleName] !== undefined && !isNaN(newPrice)) {
      vehiclePrices[vehicleName] = newPrice;
      await message.delete(); // Delete the !editprices message after processing it
    }
  }

  // Command to update quantity for vehicles
  if (message.content.startsWith('!edit') && message.content.length > 6) {
    const args = message.content.split(' ');
    const vehicleName = args[0].slice(5); // Get vehicle name after "!edit"
    const newQuantity = parseInt(args[1]);

    if (vehicleQuantities[vehicleName] !== undefined && !isNaN(newQuantity)) {
      vehicleQuantities[vehicleName] = newQuantity;
      await message.delete(); // Delete the !edit command message after processing it
    }
  }

  // Command to show prices
  if (message.content === '!prices') {
    let priceList = '**Vehicle Prices:**\n';
    for (const [vehicle, price] of Object.entries(vehiclePrices)) {
      priceList += `${vehicle}: $${price} | Quantity: ${vehicleQuantities[vehicle]}\n`;
    }
    await message.channel.send(priceList);
  }
});

client.login(process.env.DISCORD_TOKEN);
