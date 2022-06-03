const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Отобразить аватар.',
	type: 'info',
	args: false,
	usage: '<user/userId>',
	async execute(message, args) {

		let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Баннер')
					.setStyle('PRIMARY'),
			);

		message.reply({
			embeds: [{
				"title": `**Аватар ${member.user.username}**`,
				"image": {"url": `${member.user.displayAvatarURL({format: 'png', size: 1024})}`},
				"color": "#000aff"
			}],
			components: [row] 
		});

		const user = await client.users.cache.get(`${member.id}`).fetch({ force: true });

		const filter = i => i.customId === 'primary' && i.user.id === `${message.member.id}`;

		const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

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
