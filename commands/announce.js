import { SlashCommandBuilder } from '@discordjs/builders';

const announce = new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Announces a message to the server.')
    .addChannelOption(option => option.setName('channel').setRequired(true).setDescription('The channel to send the message to.'))
    .addTextOption(option => option.setName('message').setRequired(true).setDescription('The message to send.'))
    .setExecutor(async (message, args) => {
        const channel = message.client.channels.cache.get(args.channel);
        if (!channel) {
            return message.reply('Could not find the channel.');
        }
        await channel.send(args.message);
        return message.reply('Message sent.');
    }
);

const rawData = announce.toJSON();
export default announce;
export { rawData };