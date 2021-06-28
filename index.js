// Load token from .env file 
const dotenv = require('dotenv');
dotenv.config();

// Require the discord.js module
const Discord = require('discord.js');

// Create a new Discord Client
const client = new Discord.Client();

// General global variables
const prefix = "save";

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

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    } 
})


// Login to Discord with appi's token
client.login(process.env.TOKEN);