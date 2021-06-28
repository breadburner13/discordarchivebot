// Load token from .env file 
const dotenv = require('dotenv');
dotenv.config();

// Require the appropriate files
const Discord = require('discord.js');
const fs = require('fs');

// Create a new Discord Client and commands
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Dynamically retrieves command files 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// General global variables
const prefix = "-s"

// When the client is ready, trigger this event one time. 
client.once('ready', () => {
	console.log('Ready!');
});

// Using .on rather than .once allows event to trigger multiple times
client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong.');
    }
})


// Message Event
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) {
        return message.channel.send(`No valid command found.`);
    }

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command.');
    } 
})


// Login to Discord with appi's token
client.login(process.env.TOKEN);