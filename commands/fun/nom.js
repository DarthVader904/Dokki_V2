const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('nom')
    .setDescription('Дать вкусняшку участнику.')
    .addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.')),
    async execute(message, args) {
        let mention = message.options.get('target')

        if (!mention) {
            return message.reply('Упомяните того, комoго хотите угостить вкусняшкой.');
        }
        
        if (mention.id == message.user.id) {
        	return message.reply('Вы не можете это сделать.')
        }
        
        if (mention.user.bot) {
        	return message.reply('Робот не ответит вам взаимностью.')
        }
       
        const responses = [
            "https://c.tenor.com/CHTk5L8ls8cAAAAM/eat-food.gif",
            "https://c.tenor.com/QL5EG0op4uQAAAAM/kamuikanna-anime.gif",
            "https://c.tenor.com/WDlv72ZMI5cAAAAM/cat-cartoon.gif",
            "https://c.tenor.com/xS09IqCS1e0AAAAM/anime-anime-boy.gif",
            "https://c.tenor.com/JHqOKnXVNDQAAAAM/azunom-feed.gif",
            "https://c.tenor.com/0NfPiObsw8QAAAAM/feed-ryuko.gif",
            "https://c.tenor.com/Ad3vzXAh9q0AAAAM/cake-anime.gif",
            "https://c.tenor.com/NRCCvND3mWgAAAAM/dandidave-anime.gif",
            "https://c.tenor.com/cCGBRRpZxqYAAAAM/anime-cute.gif",
            "https://tenor.com/view/nomnom-nom-hamster-yummy-eating-gif-5416132"
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        const nomEmbed = new Discord.MessageEmbed()
        .addField(`Реакция`, `${message.user} дал(a) вкусеяшку ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [nomEmbed]})
        
        
    }
    }