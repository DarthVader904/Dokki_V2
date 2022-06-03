const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'punch',
    description: 'Ударить участника.',
    type: 'fun',
    args: true,
    usage: '<user/userId>',
    async execute(message, args) {
        let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!mention) {
            return message.reply('Упомяните того, кого хотите ударить.');
        }
        
        if (mention.id == message.author.id) {
        	return message.reply('Вы не можете это сделать.')
        }
        
        if (mention.user.bot) {
        	return message.reply('Робот не ответит вам взаимностью.')
        }
       
        const responses = [
            "https://c.tenor.com/fy60RaCWq08AAAAM/shikamaru-temari.gif",
            "https://c.tenor.com/VrWzG0RWmRQAAAAM/anime-punch.gif",
            "https://c.tenor.com/bfgk8FddEl8AAAAM/otto-subaru.gif",
            "https://c.tenor.com/HsnuQ0vN1s8AAAAM/naruto-sasuke.gif",
            "https://c.tenor.com/uMGoqqaf43gAAAAM/sao-anime.gif",
            "https://c.tenor.com/CL9XzpAnBc4AAAAM/rin243109-blue-exorcist.gif",
            "https://c.tenor.com/932qePpAKCkAAAAM/anime-sitri.gif",
            "https://c.tenor.com/i0qF1_U6F5wAAAAM/sword-art-online-anime.gif",
            "https://c.tenor.com/d44VyilsgeMAAAAM/vegeta-anime.gif",
            "https://c.tenor.com/HHvUYbGJpuMAAAAM/power-strike.gif"
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        const punchEmbed = new Discord.MessageEmbed()
        .addField(`Реакция`, `${message.author} ударил(a) ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [punchEmbed]})
        
        
    }
    }