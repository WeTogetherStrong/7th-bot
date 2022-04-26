import { MessageEmbed } from 'discord.js';


export default function messageEdit(message) {
    try {
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Message Edited')
            .setDescription(`${message.author} edited their message:`)
            .addField('Old Message', message.content)
            .addField('New Message', message.content)
            .setTimestamp();
        message.guild.channels.cache.get('724098680109879552').send(embed);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    //true: message was sent
    //false: message was not sent
}