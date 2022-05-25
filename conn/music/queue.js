const { RepeatMode } = require('discord-music-player');


module.exports = {
    name: "queue",
    aliases: ['q'],
    description: "Показать плейлист",
    type: 'music',
    args: false,
    execute(message) {
        
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
            description: 'Список оганичен 1024 символами!',
            fields: [{
                name: `Список:`,
                value: `${guildQueue.songs.map((i) => `${guildQueue.songs.indexOf(i)+1}. ${i}`).join('\n').slice(0,1024)}`
            }],
            color: '000aff'
        }]})

    }
}