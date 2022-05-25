const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Узнать список комманд')
		.addStringOption(option => option.setName('text').setDescription('Укажите комманду.')),
	async execute(interaction) {
		
		let args = interaction.options.getString('text');
		const prefix = '/';
		const { comms } = client;

		if (!args) {
			const embed = new MessageEmbed()
				.setTitle('Вот список всех моих команд:')
				.setDescription(`\nВы можете отправить \`${prefix}help [имя команды]\`, чтобы получить информацию о конкретной команде!`)
				.addFields({
					name: 'Веселье:',
					value: `${comms.filter((com) => com.type == 'fun').map(comm => comm.name).join(', ')}`
				},{
					name: 'Информация:',
					value: `${comms.filter((com) => com.type == 'info').map(command => command.name).join(', ')}`
				},{
					name: 'Модерация:',
					value: `${comms.filter((com) => com.type == 'moder').map(command => command.name).join(', ')}`
				},{
					name: 'Музыка:',
					value: `${comms.filter((com) => com.type == 'music').map(command => command.name).join(', ')}`
				})
				.setColor("#000aff")
				.setTimestamp()
			return interaction.reply({embeds: [embed]});
		}
		const name = args;
		const command = comms.get(name) || comms.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Это недопустимая команда!');
		}

		const embed2 = new MessageEmbed()
		.addField(`**Имя:**`, `${command.name}`)
		.setColor("#000aff")
		.setTimestamp();

		if (command.aliases) embed2.addField(`**Альтернатива:**`, `${command.aliases.join(', ')}`);
		if (command.description) embed2.addField(`**Описание:**`, `${command.description}`);
		if (command.usage) embed2.addField(`**Использлвание:**`, `${prefix}${command.name} ${command.usage}`);

		interaction.reply({embeds: [embed2]});
	},
};
