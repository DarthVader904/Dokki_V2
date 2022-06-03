const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'kiss',
    description: 'Поцеловать участника.',
    type: 'fun',
    args: true,
    usage: '<user/userId>',
    async execute(message, args) {
        let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!mention) {
            return message.reply('Упомяните того, кого хотите поцеловать.');
        }
        
        if (mention.id == message.author.id) {
        	return message.reply('Вы не можете это сделать.')
        }
        
        if (mention.user.bot) {
        	return message.reply('Робот не ответит вам взаимностью.')
        }
       
        const responses = [
            "https://c.tenor.com/BjwmxFVGKm0AAAAM/toloveru-unexpected.gif",
            "https://c.tenor.com/bkF2kFvXR50AAAAM/yes-love.gif",
            "https://c.tenor.com/qfY-5liiihUAAAAM/blowkiss-anime.gif",
            "https://c.tenor.com/s1VvsszCbCAAAAAM/love-you.gif",
            "https://c.tenor.com/vmrR0VoDVRkAAAAM/blow-kiss-anime-blow-kiss.gif",
            "https://c.tenor.com/v4Ur0OCvaXcAAAAM/koi-to-uso-kiss.gif",
            "https://c.tenor.com/e6cYiAPPCq4AAAAM/anime-kissing.gif",
            "https://c.tenor.com/9rN8nw7pVcEAAAAM/anime-kiss.gif",
            "https://c.tenor.com/0E_odieuKmwAAAAM/anime-zero.gif",
            "https://c.tenor.com/JwNMk8ggpi8AAAAM/anime-anime-kiss.gif"
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        const kissEmbed = new Discord.MessageEmbed()
        .addField(`Реакция`, `${message.author} поцеловал(a) ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [kissEmbed]})
        
        
    }
    }
