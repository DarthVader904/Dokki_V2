const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, Permissions} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Выгнать участника.')
  .addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Причина бана.').setRequired(true)),
  async execute(interaction) {
    
	  if(!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, вы не можете её использовать!`,
				"color": "#FF0000"
			}], ephemeral: true })
    }

    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, у меня недостаточно прав для использования этой команды!`,
				"color": "#FF0000"
			}], ephemeral: true })
    }

    let target = interaction.options.get('target')

    if(target.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${interaction.user.username}**, вы не можете выгонять модераторов!`,
				"color": "#FF0000"
			}], ephemeral: true })
    }

    if(target.id === interaction.user.id) {
     return interaction.reply({embeds: [{
      "title": "**ВНИМАНИЕ**",
        "description": `<:xx:894975989531172875> **${interaction.user.username}**, нельзя бить себя!`,
        "color": "#FF0000"
    }], ephemeral: true })
    }
    
    let reason = interaction.options.get('reason')
   
    let embed = new MessageEmbed()
    .setTitle("Action: Kicked")
    .setDescription(`Выгнан ${target.user.username} (${target.user.id})`)
    .setColor("#000aff")
    .setFooter(`Выгнал ${interaction.user.username}`)
    .setTimestamp()
    .addField('Причина', `${reason.value}`);
    
    interaction.reply({embeds: [embed]})
    target.member.kick({reason: reason.value})
  }
}