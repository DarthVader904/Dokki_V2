const {MessageEmbed, Permissions} = require('discord.js')

module.exports = {
 	name: 'unban',
 	description: 'Разбанить пользователя',
	type: 'moder',
	args: true,
	usage: '<userId>',
  	execute(message, args) {
 		
 		if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.author.username}**, вы не можете её использовать!`,
				"color": "#FF0000"
			}]})
		}
		if(!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.author.username}**, у меня недостаточно прав для использования этой команды!`,
				"color": "#FF0000"
			}]})
		}

    	const id = args[0]
    
    	if(!id) {
    		return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.author.username}**, укажите id, кого хотите разбанить!`,
				"color": "#FF0000"
			}]})
    	}

		if (!message.guild.bans.cache.get(id)) {
			return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.author.username}**, этот участник не в бане или это не его id!`,
				"color": "#FF0000"
			}]}) 
		}

		message.guild.members.unban(id)

    	message.reply({embeds: [{
			"title": "**Снятие бана**",
			"description": `<:__:894975989145288795> <@${id}>|${id} был разбанен`,
			"color": "#00FF00"
		}]})
    }
}