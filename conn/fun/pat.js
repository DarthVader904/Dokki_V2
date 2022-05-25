const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'pat',
    description: 'Погладить участника.',
    type: 'fun',
    args: true,
    usage: '<user/userId>',
    async execute(message, args) {
        let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!mention) {
            return message.reply('Упомяните того, кого хотите погладить.');
        }
        
        if (mention.id == message.author.id) {
        	return message.reply('Вы не можете это сделать.')
        }
        
        if (mention.user.bot) {
        	return message.reply('Робот не ответит вам взаимностью.')
        }
       
        const responses = [
            "https://c.tenor.com/afKzI9a28lIAAAAM/anime-girl.gif",
            "https://c.tenor.com/6dLDH0npv6IAAAAM/nogamenolife-shiro.gif",
            "https://c.tenor.com/N-d2Xso0k_cAAAAM/bakemonogatari-monogatari.gif",
            "https://c.tenor.com/Wth7fEpgZ7EAAAAM/neko-anime-girl.gif",
            "https://c.tenor.com/2oOTpioZ_j4AAAAM/pet-cute.gif",
            "https://c.tenor.com/HbKkTMht1VkAAAAM/anime-cute.gif",
            "https://c.tenor.com/sjK6VdD1tC4AAAAM/anime-pet.gif",
            "https://c.tenor.com/o0re0DQzkd8AAAAM/anime-head-rub.gif",
            "https://c.tenor.com/QyEiFvyqE3IAAAAM/cafun%C3%A9-pet.gif",
            "https://c.tenor.com/4Sy0Q_i8LgcAAAAM/anime-girl-pet.gif"
        ];
        
        const randomIndex = Math.floor(Math.random() * responses.length);
        const slapEmbed = new Discord.MessageEmbed()
        .addField(`Реакция`, `${message.author} погладил ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [slapEmbed]})
        
        
    }
}