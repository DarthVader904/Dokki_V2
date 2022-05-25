const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Написать текст')
		.addStringOption(option => option.setName('text').setDescription('Укажите текст')),
	async execute(interaction) {
		
		const args = interaction.options.getString('text');
		
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Недостаточно прав на использование команды!"); 
    
    	if (args) return interaction.reply(`${args}`);
		return interaction.reply(`Укажите текст`)
    
	}
}
		