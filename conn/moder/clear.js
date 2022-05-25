const { Permissions } = require('discord.js');

module.exports = {
	name: 'clear',
	description: 'Удалить сообщения',
    type: 'moder',
    args: true,
	usage: '<size>',
	async execute(message) {
		const arggs = message.content.split(' ').slice(1);

 		const amount = arggs.join(' ');
		
		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return msg.reply(`<:xx:894975989531172875> **${message.author.username}**, у вас недостаточно прав на использование команды!`);
		
		if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
			return message.reply(`<:xx:894975989531172875> **${message.author.username}**, у меня недостаточно прав для использования этой команды!`)
		}
		
		if (!amount) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, вы не указали, сколько сообщений нужно удалить!`); 
		
		if (isNaN(amount)) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, это не число!`); 
		
		if (amount > 100) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, вы не можете удалить 100 сообщений за раз!`);
		
		if (amount < 1) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, вы должны ввести число больше чем 1!`);

        async function delete_messages() {
        	
      		await message.channel.messages.fetch({ limit: amount }).then(messages => {
        		message.channel.bulkDelete(messages)
        	})
		};
        delete_messages(); 
		message.reply(`<:__:894975989145288795> Удалено ${amount} сообщений!`)
    }
}
