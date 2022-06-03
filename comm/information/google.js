const googleIt = require('google-it')
const {MessageEmbed} = require('discord.js')

module.exports = {
 	name: 'google',
	description: 'Провести запрос в гугл',
    type: 'info',
    args: false,
  	execute(message) {
        const embed = new MessageEmbed()
        .setTitle("Результаты поиска Google")
        .setColor(3426654)
        .setTimestamp()

        let args = message.cleanContent.split('').slice(7).join('');
        const stop = ['порно', 'секс', 'порн', 'секас', 'porn', 'sex', 'группавуха']

        if(stop.some(word => args.toLowerCase().includes(word))){
            return message.channel.send("Ваш запрос содержит недопустимое слово!")
        } 
    
        googleIt({'query': args, "limit": 5}).then(results => {

            results.forEach(function(item, index) {
                embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
            });
            
            message.channel.send({embeds: [embed]});
        }).catch(e => {
            console.log(e)
        });
    }
}