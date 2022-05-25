const { RepeatMode } = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Проигрывать музыку')
		.addStringOption(option => option.setName('volume').setDescription('Укажите громкость').setRequired(true)),
    async execute(message) {

        const args = message.options.getString('volume');

        let guildQueue = client.player.getQueue(message.guild.id);

        if(!guildQueue) {
            message.reply('Очередь пуста!');
            return
        }

        if(message.member.voice.channelId !== message.guild.me.voice.channelId) {
            message.reply('Вы не в голосовом канале')
            return
        }

		if (isNaN(args)) return message.reply(`<:xx:894975989531172875> **${message.user.username}**, это не число!`); 

		if (args > 100) return message.reply(`<:xx:894975989531172875> **${message.user.username}**, максимум 100`);

		if (args < 1) return message.reply(`<:xx:894975989531172875> **${message.user.username}**, минимум 1!`);

        guildQueue.setVolume(parseInt(args))

        message.reply(`:loud_sound: Громкость установлена на ${args}`)

    }
}