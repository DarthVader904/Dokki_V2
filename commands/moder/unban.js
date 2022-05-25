const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, Permissions} = require('discord.js')

module.exports = {
 	data : new SlashCommandBuilder()
 	.setName('unban')
 	.setDescription('Разбанить пользователя')
 	.addStringOption(option => option.setName('target').setDescription('ID пользователя.').setRequired(true)),
  	execute(interaction) {
 		
 		if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, вы не можете её использовать!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}

		if(!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, у меня недостаточно прав для использования этой команды!`,
				"color": "#FF0000"
			}], ephemeral: true }) 	
		}

		let target = interaction.options.get('target')
    
    	if (!interaction.guild.bans.cache.get(target.value)) {
			return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, этот участник не в бане или это не его id!`,
				"color": "#FF0000"
			}], ephemeral: true }) 
		}
		
		interaction.guild.members.unban(target.value)
    
    	interaction.reply({embeds: [{
			"title": "**Снятие бана**",
			"description": `<:__:894975989145288795> <@${target.value}>|${target.value} был разбанен`,
			"color": "#00FF00"
		}]})
    
    	
    }
    
}