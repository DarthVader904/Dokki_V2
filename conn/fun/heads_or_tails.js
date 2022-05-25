module.exports = {
		name: 'heads_or_tails',
		description: 'Подбросить монетку.',
        type: 'fun',
        args: false,
	async execute(interaction, args) {
		
		var random = Math.floor(Math.random() * 4);

        if (random == 1) { 
            args = (':full_moon: Орёл!');
        } else if (random == 2) { 
            args = (':new_moon: Решка!');
        } else if (random == 3) { 
            args = (':last_quarter_moon: Монета упала ребром!');
        }

        interaction.reply("Монета подбрасывается").then(message => {
            setTimeout(() => {
                if (args.length != 0) return message.edit(`${args}`);
                return message.edit("Монета укатилась");
            }, 1000)
        })
    }
}