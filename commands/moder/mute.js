const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, Permissions} = require('discord.js')
const ms = require('ms')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('mute')
	.setDescription('Замутить участника.')
	.addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.').setRequired(true))
	.addStringOption(option => option.setName('time').setDescription('Время затыкания (пример: 12h).').setRequired(true))
	.addStringOption(option => option.setName('reason').setDescription('Причина мута.').setRequired(true)),
	async execute(interaction) {

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
    
    	if(target.id === interaction.user.id) {
     		return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
  				"description": `<:xx:894975989531172875> **${interaction.user.username}**, нельзя бить себя!`,
  				"color": "#FF0000"
			}], ephemeral: true })
    	}

    	if(target.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
				return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, вы не можете мутить модераторов!`,
				"color": "#FF0000"
			}], ephemeral: true })
		}
    
		let time = interaction.options.get('time')    

    	let mutetime = time.value

		let rs = interaction.options.get('reason')  

		target.member.timeout(ms(mutetime), `${interaction.user.username}|${ms(ms(mutetime))}|${rs}`)
		
		let muteembed = new MessageEmbed()
		.setTitle("Action: mute")
		.setDescription(`<:__:894975989145288795> Замьючен ${target.user.username} (${target.user.id}) на ${ms(ms(mutetime))}`)
		.setColor("#00ff00")
		.setFooter({
			text: `Замьютил ${interaction.user.username}`
		});
    
    	interaction.reply({embeds: [muteembed]})
  	}
}