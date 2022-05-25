const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Пропустить песню'),
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

        guildQueue.skip();

        message.reply(':track_next: Музыка пропущена')

    }
}