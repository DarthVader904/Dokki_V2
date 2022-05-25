const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Остановить музыку'),
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

        if(guildQueue.paused == false) {
            guildQueue.setPaused(true);
            message.reply(':track_next: Музыка остановлена')
        } else {
            guildQueue.setPaused(false);
            message.reply(':track_next: Музыка воспроизведена')
        }

    }
}