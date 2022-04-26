import { MessageEmbed } from 'discord.js';

export default function messageDelete() {
    try {
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Message Deleted')
            .setDescription(`${message.author} deleted their message:`)
            .addField('Message', message.content)
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