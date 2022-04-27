import { SlashCommandBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, userMention, MessageActionRowComponentBuilder,   } from "@discordjs/builders";
import { MessageEmbed, MessageActionRow } from "discord.js";
import { getWarns } from "../database/warns";
import ms from 'ms';

const punish = new SlashCommandBuilder()
    .setName('punish')
    .addUserOption(option => option.setName('user').setDescription(`Who do you want to punsish`).setRequired(true))
    .addTextOption(option => option.setName('reason').setDescription(`The reason for the punishment`).setRequired(true))
    .addTextOption(option => option.setName('time').setDescription(`The time for the punishment`).setRequired(false))
    .setDescription('Punsishes a user')
    .setExecutor(async (message, args) => {
        if (guild.member(message.members.first()).hasPermission('MANAGE_MEMBERS')) {
        var row = new MessageActionRow()
            .addComponents(
                [
                new SelectMenuBuilder()
                    .addOptions(
                        [
                            new SelectMenuOptionBuilder()
                                .setName('Mute')
                                .setDescription('Mutes the user')
                                .setAction(async () => {
                                    message.guild.member(message.mentions.users.first()).timeout(ms(args[2] ?? '1d'), args[1]);
                                    message.reply(`${userMention(args[0])} has been muted for ${args[2] ?? '1d'}`);
                                })
                                .build(),
                            new SelectMenuOptionBuilder()
                                .setName('Kick')
                                .setDescription('Kicks the user')
                                .setAction(async () => {
                                    message.guild.member(message.mentions.users.first()).kick(args[1]);
                                    message.reply(`${userMention(args[0])} has been kicked for ${args[1]}`);
                                })
                                .build(),
                            new SelectMenuOptionBuilder()
                                .setName('Ban')
                                .setDescription('Bans the user')
                                .setAction(async () => {
                                    message.guild.member(message.mentions.users.first()).ban(args[1]);
                                    message.reply(`${userMention(args[0])} has been banned for ${args[1]}`);
                                })
                                .build(),
                            new SelectMenuOptionBuilder()
                                .setName('Warn')
                                .setDescription('Warns the user')
                                .setAction(async () => {
                                    message.guild.member(message.mentions.users.first()).send(`You have been warned for ${args[1]}`);
                                    message.reply(`${userMention(args[0])} has been warned for ${args[1]}`);
                                })
                                .build()
                        ]
                    )
                ]
            )
        
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('Could not find the user.');
        }
        const reason = args.slice(1).join(' ');
        if (!reason) {
            return message.reply('You must provide a reason for the punishment.');
        }
        const embed = new MessageEmbed()
            .setTitle(`Punishment - ${userMention(user)}`)
            .addField(userMention(user), `${reason}`);
        message.channel.send({embeds: [embed], components: [row]});
    });

const punishData = punish.toJSON();
export default punish;
export { punishData };
