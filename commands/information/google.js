const googleIt = require('google-it')
const {MessageEmbed} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('google')
	.setDescription('Поиск в Google.')
    .addStringOption(option => option.setName('text').setDescription('Поисковой запрос.')),
    async execute(message) {

        const embed = new MessageEmbed()
        .setTitle("Результаты поиска Google")
        .setColor(3426654)
        .setTimestamp()

        let args = message.options.get('text') 

        const stop = ['порно', 'секс', 'порн', 'секас', 'porn', 'sex', 'группавуха']

        console.log(args)

        if(stop.some(word => args.value.toLowerCase().includes(word))){
            return message.reply("Ваш запрос содержит недопустимое слово!")
        }

        googleIt({'query': args.value, "limit": 5}).then(results => {

            results.forEach(function(item, index) { 
                //console.log(item)
                embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
            });
        
        message.reply({embeds: [embed]});
        }).catch(e => {
            // any possible errors that might have occurred (like no Internet connection)
        });
    }
}