const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, Permissions} = require('discord.js')

module.exports = {
 	data : new SlashCommandBuilder()
 	.setName('unmute')
 	.setDescription('Снять мут с пользователя')
 	.addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.').setRequired(true)),
  	execute(interaction) {
 		
 		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
			return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, вы не можете её использовать!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}
			if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
				return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, у меня недостаточно прав для использования этой команды!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}

    	let target = interaction.options.get('target')
    
    	if (target.member.communicationDisabledUntilTimestamp = null) {
			return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, участник не имеет ограничений!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}
 		
 		target.member.timeout(null)
    	interaction.reply({embeds: [{
			"title": "**Снятие мута**",
			"description": `<:__:894975989145288795> ${target.user.username}|${target.user.id} был размьючен предворительно`,
			"color": "#00FF00"
		}]})
 	}
}