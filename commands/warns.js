import { SlashCommandBuilder, userMention } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { getWarns } from '../database/warns';


const warns = new SlashCommandBuilder()
    .setName('warns')
    .addUserOption(option => option.setName('user').setDescription(`Who's warns do you want to see`).setRequired(false))
    .setDescription('Shows the warns of a user')
    .setExecutor(async (message, args) => {
        if (!args[0]) {
            var embed = new MessageEmbed()
                .setTitle('Warns - List')
                for (const [key, value] of JSON.parse(getWarns()).entries()) {
                    embed.addField(userMention(key), `${userMention(key)} - ${value}`);
                }
        } else {
            var embed = new MessageEmbed()
                .setTitle(`Warns - ${userMention(args[0])}`)
                .addField(userMention(args[0]), `${JSON.parse(getWarns())[message.mentions.users.first().id]}`);
        }
    }
);

var warnsData = warns.toJSON();
export default warns;
export { warnsData };