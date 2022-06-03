const { RepeatMode } = require('discord-music-player');

module.exports = {
    name: "stop",
    description: "Окончить прослушивание",
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

        guildQueue.stop();

        message.reply(':stop_button: Сеанс окончен')
    }
}