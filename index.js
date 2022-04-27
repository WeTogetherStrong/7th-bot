import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
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
const commands = []
fs.readdirSync('./commands').forEach(file => {
    if (!file.endsWith('.js')) return;
    const command = require(`./commands/${file}`);
    commands.push(command);
});

//register events
fs.readdirSync('./events').forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    bot.on(eventName, (msg) => event.run(bot, msg));
});

const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

//login
bot.login(process.env.TOKEN);