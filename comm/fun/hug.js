const Discord = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'Обнять участника.',
    type: 'fun',
    args: true,
    usage: '<user/userId>',
    async execute(message, args) {
        let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!mention) {
            return message.reply('Упомяните того, комoго хотите обнять.');
        }
        
        if (mention.id == message.author.id) {
        	return message.reply('Вы не можете это сделать.');
        }
        
        if (mention.user.bot) {
        	return message.reply('Робот не ответит вам взаимностью.');
        }
       
        const responses = [
            "https://c.tenor.com/Ct4bdr2ZGeAAAAAM/teria-wang-kishuku-gakkou-no-juliet.gif",
            "https://c.tenor.com/9e1aE_xBLCsAAAAM/anime-hug.gif",
            "https://c.tenor.com/DVOTqLcB2jUAAAAM/anime-hug-love.gif",
            "https://c.tenor.com/X5nBTYuoKpoAAAAM/anime-cheeks.gif",
            "https://c.tenor.com/C-U_p6VFh2cAAAAM/cuddle-hug.gif",
            "https://c.tenor.com/xIuXbMtA38sAAAAM/toilet-bound-hanakokun.gif",
            "https://c.tenor.com/SXk-WqF6PpQAAAAM/anime-hug.gif",
            "https://c.tenor.com/IC8bGfUwtL4AAAAM/elfenlied-kouta.gif",
            "https://c.tenor.com/zirc8LTWVUkAAAAM/hug-anime.gif",
            "https://c.tenor.com/v_cUUT30jqsAAAAM/anime.gif"
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        const hugEmbed = new Discord.MessageEmbed()
        .addField(`Реакция`, `${message.author} обнял(a) ${mention.user}`)
        .setImage(responses[randomIndex])
        .setTimestamp()
        .setColor("#000aff")
        message.reply({embeds: [hugEmbed]});
        
    }
    }
