const { Permissions } = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'Отправить embed.',
    type: 'moder',
    args: true,
    usage: '<json>',
	async execute(message) {
		let args = message.cleanContent.split('').slice(7).join('');
		
		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("Недостаточно прав на использование команды!"); 

    	message.delete().catch();

        try {
            var json = JSON.parse(args);
        } catch(e) {
            message.channel.send('json составлен с ошибкой.');
            console.log(e);
            return;
        }
    
    	message.channel.send({embeds: [json]})
        .catch((e) => {
            message.channel.send('json составлен неверно.');
            console.log(e);
            return
        });
	}
}