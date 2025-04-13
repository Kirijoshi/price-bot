require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ] 
});

// Load vehicle data from the JSON file (or use default if not found)
let vehicleData = { prices: {}, quantities: {} };
const dataFile = './vehicleData.json';

if (fs.existsSync(dataFile)) {
  vehicleData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
} else {
  // Default values (with only 1 Javelin)
  vehicleData = {
    prices: {
      Torpedo: { price: 17, emoji: '🚗' },
      Javelin: { price: 15, emoji: '🚀' },
      Beignet: { price: 13.5, emoji: '🍩' },
      Celsior: { price: 12, emoji: '🚘' },
      'Proto-8': { price: 11, emoji: '🤖' },
      Arachnid: { price: 10, emoji: '🕷️' },
      'Beam Hybrid': { price: 9.5, emoji: '🔋' },
      Icebreaker: { price: 9, emoji: '❄️' },
      Banana: { price: 8.5, emoji: '🍌' },
      'Power-1': { price: 8, emoji: '⚡' },
      'Molten M12': { price: 8, emoji: '🔥' },
      Raptor: { price: 7.5, emoji: '🦖' },
      'Crew Capsule': { price: 7, emoji: '🚀' },
      Bantid: { price: 6.5, emoji: '🐝' },
      Parisian: { price: 6, emoji: '🗼' },
      Aperture: { price: 5.5, emoji: '🔲' },
      Rattler: { price: 5, emoji: '🐍' },
      Shogun: { price: 4.5, emoji: '🥷' },
      Scorpion: { price: 4, emoji: '🦂' },
      Carbonara: { price: 3.5, emoji: '🍝' },
      'Volt 4x4': { price: 3, emoji: '🔌' },
      Goliath: { price: 2.5, emoji: '💪' },
      Macaron: { price: 2.5, emoji: '🍪' },
      JB8: { price: 2.5, emoji: '🎮' },
      Torero: { price: 2.25, emoji: '🦸' },
      Brûlée: { price: 2.25, emoji: '🍮' },
      Snake: { price: 2, emoji: '🐍' },
      Iceborn: { price: 2, emoji: '❄️' },
      Airtail: { price: 1.75, emoji: '✈️' },
      Poseidon: { price: 1.5, emoji: '🌊' },
      Bloxy: { price: 1.5, emoji: '🎮' },
      Wedge: { price: 1.5, emoji: '🧱' },
      'Jack Rabbit': { price: 1.5, emoji: '🐇' },
      Stormrider: { price: 1.25, emoji: '🌩️' },
      Longhorn: { price: 1.25, emoji: '🐂' },
      'Frost Crawler': { price: 1, emoji: '❄️' },
      'Og Monster': { price: 1, emoji: '👹' },
      Striker: { price: 0.75, emoji: '🥊' },
      Megalodon: { price: 0.75, emoji: '🦈' },
      'Shell Classic': { price: 0.75, emoji: '🐚' },
      Maverick: { price: 0.75, emoji: '🦅' },
    },
    quantities: {
      Torpedo: 0,
      Javelin: 0,
      Beignet: 0,
      Celsior: 0,
      'Proto-8': 0,
      Arachnid: 0,
      'Beam Hybrid': 0,
      Icebreaker: 0,
      Banana: 0,
      'Power-1': 0,
      'Molten M12': 0,
      Raptor: 0,
      'Crew Capsule': 0,
      Bantid: 0,
      Parisian: 0,
      Aperture: 0,
      Rattler: 0,
      Shogun: 0,
      Scorpion: 0,
      Carbonara: 0,
      'Volt 4x4': 0,
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
      'Jack Rabbit': 0,
      Stormrider: 0,
      Longhorn: 0,
      'Frost Crawler': 0,
      'Og Monster': 0,
      Striker: 0,
      Megalodon: 0,
      'Shell Classic': 0,
      Maverick: 0,
    }
  };
}

const saveData = () => {
  fs.writeFileSync(dataFile, JSON.stringify(vehicleData, null, 2));
};

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Command to get all vehicle prices
  if (message.content.toLowerCase() === '!prices') {
    await message.delete(); // Delete the !prices command message

    const priceList = Object.entries(vehicleData.prices)
      .map(([name, { price, emoji }]) => `${emoji} ${name}: $${price}`)
      .join('\n');
    
    await message.channel.send(priceList);
    return;
  }

  // Command to update vehicle prices
  if (message.content.toLowerCase().startsWith('!editprices')) {
    const args = message.content.split(' ');
    const vehicleName = args[1];
    const newPrice = parseFloat(args[2]);

    if (!vehicleData.prices[vehicleName]) {
      return message.channel.send('Invalid vehicle name.');
    }

    if (isNaN(newPrice)) {
      return message.channel.send('Please provide a valid price.');
    }

    vehicleData.prices[vehicleName].price = newPrice;
    saveData(); // Save data to the JSON file

    await message.delete(); // Delete the !editprices command message
    await message.channel.send(`Price of ${vehicleName} updated to $${newPrice}`);
    return;
  }

  // Command to update vehicle quantity
  if (message.content.toLowerCase().startsWith('!editquantity')) {
    const args = message.content.split(' ');
    const vehicleName = args[1];
    const newQuantity = parseInt(args[2]);

    if (!vehicleData.quantities[vehicleName]) {
      return message.channel.send('Invalid vehicle name.');
    }

    if (isNaN(newQuantity) || newQuantity < 0) {
      return message.channel.send('Please provide a valid quantity.');
    }

    vehicleData.quantities[vehicleName] = newQuantity;
    saveData(); // Save data to the JSON file

    await message.delete(); // Delete the !editquantity command message
    await message.channel.send(`Quantity of ${vehicleName} updated to ${newQuantity}`);
    return;
  }
});

client.login(process.env.TOKEN);
