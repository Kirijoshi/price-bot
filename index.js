const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let vehicleData = {
  prices: {
    torpedo: 17,
    javelin: 15,
    beignet: 13.5,
    celsior: 12,
    proto8: 10.5,
    arachnid: 9,
    beamHybrid: 8.75,
    icebreaker: 8.5,
    banana: 7.5,
    power1: 7,
    moltenM12: 7,
    raptor: 6.5,
    crewCapsule: 6,
    bantid: 4.5,
    parisian: 4,
    aperture: 3.75,
    rattler: 3.5,
    shogun: 3.25,
    scorpion: 3,
    carbonara: 2.75,
    volt4x4: 2.5,
    goliath: 2,
    macaron: 2,
    jb8: 2,
    torero: 1.75,
    brulee: 1.75,
    snake: 1.5,
    iceborn: 1.5,
    airtail: 1.375,
    poseidon: 1,
    bloxy: 1,
    wedge: 1,
    jackRabbit: 1,
    stormrider: 0.875,
    longhorn: 0.875,
    frostCrawler: 0.75,
    ogMonster: 0.75,
    striker: 0.625,
    megalodon: 0.625,
    shellClassic: 0.625,
    maverick: 0.625,
    javelin: 0.5,
  },
  quantities: {
    torpedo: 0,
    javelin: 0,
    beignet: 0,
    celsior: 0,
    proto8: 0,
    arachnid: 0,
    beamHybrid: 0,
    icebreaker: 0,
    banana: 0,
    power1: 0,
    moltenM12: 0,
    raptor: 0,
    crewCapsule: 0,
    bantid: 0,
    parisian: 0,
    aperture: 0,
    rattler: 0,
    shogun: 0,
    scorpion: 0,
    carbonara: 0,
    volt4x4: 0,
    goliath: 0,
    macaron: 0,
    jb8: 0,
    torero: 0,
    brulee: 0,
    snake: 0,
    iceborn: 0,
    airtail: 0,
    poseidon: 0,
    bloxy: 0,
    wedge: 0,
    jackRabbit: 0,
    stormrider: 0,
    longhorn: 0,
    frostCrawler: 0,
    ogMonster: 0,
    striker: 0,
    megalodon: 0,
    shellClassic: 0,
    maverick: 0,
    javelin: 0,
  },
};

const saveData = () => {
  fs.writeFileSync('vehicleData.json', JSON.stringify(vehicleData, null, 2));
};

const loadData = () => {
  if (fs.existsSync('vehicleData.json')) {
    const rawData = fs.readFileSync('vehicleData.json');
    vehicleData = JSON.parse(rawData);
  }
};

client.once('ready', () => {
  console.log('Bot is online!');
  loadData();
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Command to show prices
  if (message.content.toLowerCase() === '!prices') {
    const priceList = Object.keys(vehicleData.prices)
      .map((vehicle) => {
        const price = vehicleData.prices[vehicle];
        const quantity = vehicleData.quantities[vehicle];
        const emoji = vehicle === 'javelin' ? '🚀' : '🚗'; // You can change the emojis here
        return `${emoji} **${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}**: ${price} | Quantity: ${quantity}`;
      })
      .join('\n');

    await message.delete();
    await message.channel.send(priceList);
    return;
  }

  // Command to update vehicle quantity
  if (message.content.toLowerCase().startsWith('!editquantity')) {
    const args = message.content.split(' ');
    const vehicleName = args[1].toLowerCase(); // Convert to lowercase to handle case insensitivity
    const newQuantity = parseInt(args[2]);

    // Find the vehicle name from the vehicleData (case-insensitive match)
    const vehicle = Object.keys(vehicleData.quantities).find(v => v.toLowerCase() === vehicleName);

    if (!vehicle) {
      return message.channel.send('Invalid vehicle name.');
    }

    if (isNaN(newQuantity) || newQuantity < 0) {
      return message.channel.send('Please provide a valid quantity.');
    }

    // Update the quantity
    vehicleData.quantities[vehicle] = newQuantity;
    saveData(); // Save data to the JSON file

    await message.delete(); // Delete the !editquantity command message
    await message.channel.send(`Quantity of ${vehicle} updated to ${newQuantity}`);
    return;
  }

  // Command to update vehicle price
  if (message.content.toLowerCase().startsWith('!editprices')) {
    const args = message.content.split(' ');
    const vehicleName = args[1].toLowerCase(); // Convert to lowercase to handle case insensitivity
    const newPrice = parseFloat(args[2]);

    // Find the vehicle name from the vehicleData (case-insensitive match)
    const vehicle = Object.keys(vehicleData.prices).find(v => v.toLowerCase() === vehicleName);

    if (!vehicle) {
      return message.channel.send('Invalid vehicle name.');
    }

    if (isNaN(newPrice) || newPrice < 0) {
      return message.channel.send('Please provide a valid price.');
    }

    // Update the price
    vehicleData.prices[vehicle] = newPrice;
    saveData(); // Save data to the JSON file

    await message.delete(); // Delete the !editprices command message
    await message.channel.send(`Price of ${vehicle} updated to ${newPrice}`);
    return;
  }
});

client.login(process.env.BOT_TOKEN);
