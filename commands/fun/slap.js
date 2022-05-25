const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Дать леща участнику.')
    .addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.')),
    async execute(message, args) {
        let mention = message.options.get('target')

        if (!mention) {
            return message.reply('Упомяните того, кому хотите дать подщёчину.');
        }
        
        if (mention.id == message.user.id) {
        	return message.reply('Вы не можете это сделать.')
        }
        
        if (mention.user.bot) {
        	return message.reply('Робот не ответит вам взаимностью.')
        }
       
        const responses = [
            "https://c.tenor.com/VlSXTbFcvDQAAAAM/naruto-anime.gif",
            "https://c.tenor.com/rVXByOZKidMAAAAM/anime-slap.gif",
            "https://c.tenor.com/eU5H6GbVjrcAAAAM/slap-jjk.gif",
            "https://c.tenor.com/hNa8BhraaXsAAAAM/anime-nagatoro.gif",
            "https://c.tenor.com/ra17G61QRQQAAAAM/tapa-slap.gif",
            "https://c.tenor.com/CvBTA0GyrogAAAAM/anime-slap.gif",
            "https://c.tenor.com/NYqp3SbzsEsAAAAM/mad-angry.gif",
            "https://c.tenor.com/6zEf75r9k4IAAAAM/slap-slapping.gif",
            "https://c.tenor.com/PeJyQRCSHHkAAAAM/saki-saki-mukai-naoya.gif",
            "https://c.tenor.com/UDo0WPttiRsAAAAM/bunny-girl-slap.gif"
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        const slapEmbed = new Discord.MessageEmbed()
        .addField(`Реакция`, `${message.user} дал(a) леща ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [slapEmbed]})
        
        
    }
}