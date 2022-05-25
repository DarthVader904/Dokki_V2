const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Удалить сообщения')
	.addStringOption(option => option.setName('texst').setDescription('Укажите число.')),
	async execute(interaction) {
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return msg.reply(`<:xx:894975989531172875> **${interaction.user.username}**, у вас недостаточно прав на использование команды!`);
		
		if(!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			return interaction.reply(`<:xx:894975989531172875> **${interaction.user.username}**, У меня недостаточно прав для использования этой команды!`)
		}
		
		const amount = interaction.options.getString('texst');
		
		if (!amount) return interaction.reply(`<:xx:894975989531172875> **${interaction.user.username}**, вы не указали, сколько сообщений нужно удалить!`); 
		
		if (isNaN(amount)) return interaction.reply(`<:xx:894975989531172875> **${interaction.user.username}**, это не число!`); 
		
		if (amount > 100) return interaction.reply(`<:xx:894975989531172875> **${interaction.user.username}**, вы не можете удалить 100 сообщений за раз!`);
		
		if (amount < 1) return interaction.reply(`<:xx:894975989531172875> **${interaction.user.username}**, вы должны ввести число больше чем 1!`);

     	async function delete_messages() {
        	
        	await interaction.channel.messages.fetch({ limit: amount }).then(messages => {
        		interaction.channel.bulkDelete(messages)
        		interaction.reply(`<:__:894975989145288795> Удалено ${amount} сообщений!`)
       	})};
        delete_messages(); 
     }
}