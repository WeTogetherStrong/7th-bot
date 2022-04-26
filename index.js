import { Client, Intents } from 'discord.js';
import { config, process } from 'dotenv';
import fs from 'fs';


// Load the config file
config();

// Create the client
let bot = new Client(
    {
        intents: [Intents.ALL]
    }
);

//register commands
bot.commands = new Map();
fs.readdirSync('./commands').forEach(file => {
    if (!file.endsWith('.js')) return;
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
});

//register events
fs.readdirSync('./events').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    bot.on(eventName, (msg) => event.run(bot, msg));
});



//login
bot.login(process.env.TOKEN);