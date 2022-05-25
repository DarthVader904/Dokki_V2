const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Погладить участника.')
    .addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.')),
    async execute(message) {
        let mention = message.options.get('target')

        if (!mention) {
            return message.reply('Упомяните того, кого хотите погладить.');
        }
        
        if (mention.id == message.user.id) {
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
        .addField(`Реакция`, `${message.user} погладил ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [slapEmbed]})
        
        
    }
}