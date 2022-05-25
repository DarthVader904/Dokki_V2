const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Проигрывать музыку')
		.addStringOption(option => option.setName('text').setDescription('Укажите название песни или ссылку youtube/spotify').setRequired(true)),
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
            let song = await queue.play(args).catch(_ => {
                if(!guildQueue)
                queue.stop();
            });
            message.channel.send({embeds: [{
                title: ":musical_note: Музыка добавлена.",
                fields: [{
                    name: `Название песни:`,
                    value: `[${song.name}](${song.url})`
                },
                {
                    name: 'Автор:',
                    value: `${song.author}`
                },
                {
                    name: 'Длительность:',
                    value: `${song.duration}`
                }],
                image: {url: `${song.thumbnail}`},
                color: '#000aff'
            }]})
        } catch(err) {
            message.channel.send('Песня не найдена!')
            console.log(err)
        }
    }
}