const { RepeatMode } = require('discord-music-player');

module.exports = {
    name: "skip",
    description: "Пропустить песню",
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

        guildQueue.skip();

        message.reply(':track_next: Музыка пропущена')
    }
}