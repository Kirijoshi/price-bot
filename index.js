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
    proto8: 11,
    arachnid: 10,
    beamHybrid: 9.5,
    icebreaker: 9,
    banana: 8.5,
    power1: 8,
    moltenM12: 8,
    raptor: 7.5,
    crewCapsule: 7,
    bantid: 6.5,
    parisian: 6,
    aperture: 5.5,
    rattler: 5,
    shogun: 4.5,
    scorpion: 4,
    carbonara: 3.5,
    volt4x4: 3,
    goliath: 2.5,
    macaron: 2.5,
    jb8: 2.5,
    torero: 2.25,
    brulee: 2.25,
    snake: 2,
    iceborn: 2,
    airtail: 1.75,
    poseidon: 1.5,
    bloxy: 1.5,
    wedge: 1.5,
    jackRabbit: 1.5,
    stormrider: 1.25,
    longhorn: 1.25,
    frostCrawler: 1,
    ogMonster: 1,
    striker: 0.75,
    megalodon: 0.75,
    shellClassic: 0.75,
    maverick: 0.75,
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
        let emoji = '';

        // Assign original emojis to vehicles
        switch (vehicle) {
          case 'torpedo':
            emoji = '🚗';
            break;
          case 'javelin':
            emoji = '🚀';
            break;
          case 'beignet':
            emoji = '🍩';
            break;
          case 'celsior':
            emoji = '🚘';
            break;
          case 'proto8':
            emoji = '🤖';
            break;
          case 'arachnid':
            emoji = '🕷️';
            break;
          case 'beamHybrid':
            emoji = '🔋';
            break;
          case 'icebreaker':
            emoji = '❄️';
            break;
          case 'banana':
            emoji = '🍌';
            break;
          case 'power1':
            emoji = '⚡';
            break;
          case 'moltenM12':
            emoji = '🔥';
            break;
          case 'raptor':
            emoji = '🦖';
            break;
          case 'crewCapsule':
            emoji = '🚀';
            break;
          case 'bantid':
            emoji = '🐝';
            break;
          case 'parisian':
            emoji = '🗼';
            break;
          case 'aperture':
            emoji = '🔲';
            break;
          case 'rattler':
            emoji = '🐍';
            break;
          case 'shogun':
            emoji = '🥷';
            break;
          case 'scorpion':
            emoji = '🦂';
            break;
          case 'carbonara':
            emoji = '🍝';
            break;
          case 'volt4x4':
            emoji = '🔌';
            break;
          case 'goliath':
            emoji = '💪';
            break;
          case 'macaron':
            emoji = '🍪';
            break;
          case 'jb8':
            emoji = '🎮';
            break;
          case 'torero':
            emoji = '🦸';
            break;
          case 'brulee':
            emoji = '🍮';
            break;
          case 'snake':
            emoji = '🐍';
            break;
          case 'iceborn':
            emoji = '❄️';
            break;
          case 'airtail':
            emoji = '✈️';
            break;
          case 'poseidon':
            emoji = '🌊';
            break;
          case 'bloxy':
            emoji = '🎮';
            break;
          case 'wedge':
            emoji = '🧱';
            break;
          case 'jackRabbit':
            emoji = '🐇';
            break;
          case 'stormrider':
            emoji = '🌩️';
            break;
          case 'longhorn':
            emoji = '🐂';
            break;
          case 'frostCrawler':
            emoji = '❄️';
            break;
          case 'ogMonster':
            emoji = '👹';
            break;
          case 'striker':
            emoji = '🥊';
            break;
          case 'megalodon':
            emoji = '🦈';
            break;
          case 'shellClassic':
            emoji = '🐚';
            break;
          case 'maverick':
            emoji = '🦅';
            break;
          default:
            emoji = '🚗';
        }

        return `${emoji} **${vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}**: $${price} | Quantity: ${quantity}`;
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
