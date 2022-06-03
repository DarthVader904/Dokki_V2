module.exports = {
    name: "loop",
    aliases: ['l'],
    description: "Настройка проигрывания",
    type: 'music',
    args: true,
    usage: '<off/queue/song>',
    execute(message, args) {
       
        let guildQueue = client.player.getQueue(message.guild.id);

        if(!guildQueue) {
            message.reply('Очередь пуста!');
            return
        }

        if(message.member.voice.channelId !== message.guild.me.voice.channelId) {
            message.reply('Вы не в голосовом канале!')
            return
        }

        if(args[0] == 'off') {
            guildQueue.setRepeatMode(0);
            message.reply('Повтор отключен.');
        } else if(args[0] == 'song') {
            guildQueue.setRepeatMode(1);
            message.reply('Песня будет повторятся.');
        } else if(args[0] == 'queue') {
            guildQueue.setRepeatMode(2);
            message.reply('Очередь будет повторяться.')
        } else {
            message.reply('Необходимо указать аргумент(off, song, queue)')
        }
    }
}