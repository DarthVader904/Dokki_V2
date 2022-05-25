const { Permissions } = require('discord.js');

module.exports = {
	name: 'say',
	description: 'Написать текст.',
    type: 'moder',
    args: true,
    usage: '<text>',
	async execute(message) {
		let args = message.cleanContent.split('').slice(5).join(''); 
		
		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("Недостаточно прав на использование команды!"); 

    	message.delete().catch();
    
    	if (args) return message.channel.send(`${args}`);
		return message.reply(`Укажите текст`)
	}
}