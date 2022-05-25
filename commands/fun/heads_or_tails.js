const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('heads_or_tails')
		.setDescription('Подбросить монетку'),
	async execute(interaction, args) {
		interaction.reply("Монета подбрасывается")
		var random = Math.floor(Math.random() * 4);

        if (random == 1) { 
            args = (':full_moon: Орёл!')
        } else if (random == 2) { 
            args = (':new_moon: Решка!')
        } else if (random == 3) { 
            args = (':last_quarter_moon: Монета упала ребром!')
        }
		setTimeout(() => {if (args.length != 0) return interaction.editReply(`${args}`);
        return interaction.editReply("Монета укатилась");
    }, 1000) 
	},
};