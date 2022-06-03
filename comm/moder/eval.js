const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const { inspect } = require('util')
const wait = require('util').promisify(setTimeout);
 
module.exports = {
    name: 'eval',
    description: 'evaluates any string as javascript code and executes it.',
    async execute (message, args) {
        if(message.author.id !== '572440006367379477') return;

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('danger')
					.setLabel('Explosion')
					.setStyle('DANGER'),
			);

        const command = args.join(" ");
        if(!command) return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.author.username}**, код не задан!`,
				"color": "#FF0000"
			}]})

        try {
            const evaled = eval(command)
            let words = ["token", "destroy"]
            if(words.some(word => message.content.toLowerCase().includes(word))){
                return message.channel.send("Эти слова занесены в черный список!")
            }
            const embed = new MessageEmbed()
            .setColor("#000aff")
            .setTitle("correctly evaluated")
            .addField(`**Тип:**`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
            .addField("**Время обработки:**", `\`\`\`yaml\n${Date.now()-message.createdTimestamp} ms\`\`\``, true)
            .addField("**Вход**", `\`\`\`js\n${command}\`\`\``)
            .addField("**Выход**", `\`\`\`js\n${inspect(evaled, {depth: 0})} \`\`\``)

            message.reply({embeds: [embed], components: [row] })

        }catch (error) {
            const embedfailure = new MessageEmbed()
            .setColor("#FF0000")
            .addField(`Вход`, `\`\`\`js\n${command}\`\`\``)
            .addField(`Ошибка`, `\`\`\`js\n${error}\`\`\` `)

            message.reply({embeds: [embedfailure], components: [row] })
        }

		const filter = i => i.customId === 'danger' && i.user.id === `${message.member.id}`
		const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'danger') {
                await i.deferUpdate();
                await i.editReply('О тьма, куда не проникает свет, о черное пламя, что не освещает тьму, услышь зов Алого Мазоку и явись на его призыв. Сожги все и вся, докуда дотянется твоя карающая длань. Таков мой приказ', {embeds: null, components: null })
		        await wait(6000);
		        await i.deleteReply({embeds: [], components: [] })
			}
		});
    }
}