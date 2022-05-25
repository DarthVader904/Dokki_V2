const { RepeatMode } = require('discord-music-player');

module.exports = {
    name: "volume",
    aliases: ['v'],
    description: "Установка громкости",
    type: 'music',
    args: true,
    usage: '<volume>',
    execute(message, args) {

        let guildQueue = client.player.getQueue(message.guild.id);

        if(!guildQueue) {
            message.reply('Очередь пуста!');
            return
        }

        if(message.member.voice.channelId !== message.guild.me.voice.channelId) {
            message.reply('Вы не в голосовом канале')
            return
        }

        if (!args[0]) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, вы не указали громкость!`); 

		if (isNaN(args[0])) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, это не число!`); 

		if (args[0] > 100) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, максимум 100`);

		if (args[0] < 1) return message.reply(`<:xx:894975989531172875> **${message.author.username}**, минимум 1!`);

        guildQueue.setVolume(parseInt(args[0]))

        message.reply(`:loud_sound: Громкость установлена на ${args[0]}`)
    }
}