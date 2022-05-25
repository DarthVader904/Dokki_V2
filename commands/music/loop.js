const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Повторять песню/очередь.')
        .addStringOption(option => 
            option.setName('repeat')
                .setDescription('Необходимо указать аргумент(off, song, queue)')
                .setRequired(true)
                .addChoice('Off', 'off')
                .addChoice('Song', 'song')
                .addChoice('Queue', 'queue')),
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

        const args = message.options.getString('repeat');;

        if(args == 'off') {
            guildQueue.setRepeatMode(0);
            message.reply('Повтор отключен.');
        } else if(args == 'song') {
            guildQueue.setRepeatMode(1);
            message.reply('Песня будет повторятся.');
        } else if(args == 'queue') {
            guildQueue.setRepeatMode(2);
            message.reply('Очередь будет повторяться.')
        } else {
            message.reply('Необходимо указать аргумент(off, song, queue)')
        }
    }
}