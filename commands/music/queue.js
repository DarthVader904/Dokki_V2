const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Показать плейлист'),
    async execute(message) {
        
        let guildQueue = client.player.getQueue(message.guild.id);

        if(!guildQueue) {
            message.reply('Очередь пуста!');
            return
        }

        if(message.member.voice.channelId !== message.guild.me.voice.channelId) {
            message.reply('Вы не в голосовом канале')
            return
        }

        message.reply({embeds: [{
            title: ":page_with_curl: Плейлист.",
            fields: [{
                name: `Список:`,
                value: `${guildQueue.songs.slice(0, 10).map((i) => `${guildQueue.songs.indexOf(i)+1}. ${i}`).join('\n')}`
            }],
            color: '000aff'
        }]})

        /*if(guildQueue.songs.length > 10) {
            const row1 = new MessageActionRow()
			    .addComponents(
                    new MessageButton()
                        .setCustomId('primary')
                        .setLabel(':arrow_right:')
                        .setStyle('PRIMARY'),
                );

            message.edit({components: [row1]})

            let embed1 = new MessageEmbed()
            .setTitle(":page_with_curl: Плейлист.")
            .addField('Список:', `${guildQueue.songs.slice(10, 20).map((i) => `${guildQueue.songs.indexOf(i)+1}. ${i}`).join('\n')}`)
            .setColor("#00FF00")

        }*/

    }
}