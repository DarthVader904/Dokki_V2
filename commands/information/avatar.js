const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Возвращает URL аватара.')
		.addUserOption(option => option.setName('target').setDescription('Пользователь с аватаром.')),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const member = interaction.guild.members.cache.get(target?.id) || interaction.member;
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Баннер')
					.setStyle('PRIMARY'),
			);

		interaction.reply({
			embeds: [{
				"title": `**Аватар ${member.user.username}**`,
				"image": {"url": `${member.user.displayAvatarURL({format: 'png', size: 1024})}`},
				"color": "#000aff"
			}],
			components: [row] 
		});

		const user = await client.users.cache.get(`${member.id}`).fetch({ force: true });

		const filter = i => i.customId === 'primary' && i.user.id === `${interaction.member.id}`;

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 })

		collector.on('collect', async i => {
			if (i.customId === 'primary') {
				let color = "#000aff"
				if (user.accentColor != null) color = user.accentColor
				try {
					await i.update({
						embeds: [{
							"title": `**Баннер ${member.user.username}**`,
							"image": {"url": `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${user.banner.startsWith('a_') ? 'gif' : 'png' }?size=512`},
							"color": "#000aff"
						}],
					components: [] });
				} catch {
					await i.update({
						embeds: [{
							"title": `**Баннер ${member.user.username}**`,
							"description": `Цвет баннера ${user.accentColor || "не задан"}`,
							"color": color
						}],
					components: [] })
				}	
			}
		});
	},
};