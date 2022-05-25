const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('playlist')
		.setDescription('Проигрывать плейлист')
		.addStringOption(option => option.setName('text').setDescription('Укажите название плейлиста или ссылку плеулист youtube/spotify').setRequired(true)),
    async execute(message) {

        const args = message.options.getString('text');

        let queue = client.player.createQueue(message.guild.id, {
            data: message
        });
        try {
            await queue.join(message.member.voice.channel);
        } catch (error) {
            console.error(error);
            return message.reply({ content: 'Зайдите в голосовой канал!', ephemeral: true });
        }   
        message.reply('Обработка...')
        try {
            let song = await queue.playlist(args).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
            message.channel.send({embeds: [{
                title: ":notes: Добавлен плейлист.",
                fields: [{
                    name: `Плейлист:`,
                    value: `[${song}](${song.url})`
                }],
                color: '#000aff'
            }]})
        } catch {
            message.channel.send('Плейлист не найден!')
        }

    }
}