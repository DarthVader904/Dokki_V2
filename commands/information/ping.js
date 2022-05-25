const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Задержка'),
	async execute(interaction) {
		await interaction.reply(`🏓 API задержка ${Math.round(interaction.client.ws.ping)}ms`);
	},
};