const {Permissions} = require('discord.js')

module.exports = {
 	name: 'unmute',
	description: 'Снять мут с пользователя.',
    type: 'moder',
    args: true,
	usage: '<user/userId>',
  	execute(message, args) {
  		
  		if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
			return ({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.user.username}**, вы не можете её использовать!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}
		
		if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
			return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.user.username}**, у меня недостаточно прав для использования этой команды!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}
		
    	let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    	if(!target) {
    		return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.user.username}**, укажите, кого хотите размутить!`,
				"color": "#FF0000"
			}], ephemeral: true })
    	}
    	
    	if (target.communicationDisabledUntil === 'null') {
    		return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.user.username}**, участник не имеет ограничений!`,
				"color": "#FF0000"
			}], ephemeral: true })
    	}
 		
 		target.timeout(null)
        message.reply({embeds: [{
			"title": "**Снятие мута**",
			"description": `<:__:894975989145288795> ${target.user.username}|${target.user.id} был размьючен предворительно`,
			"color": "#00FF00"
		}]})
 	}
 }