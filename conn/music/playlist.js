module.exports = {
    name: "playlist",
    aliases: ['pl'],
    description: "проигрывать плейлист",
    type: 'music',
    args: true,
    usage: '<playlistURL>',
    async execute(message, args) {

        if(!args[0]) return message.reply({embeds: [{
            "title": "**ВНИМАНИЕ**",
            "description": `<:xx:894975989531172875> **${message.author.username}**, пожалуйста, укажите ссылку на плейлист!`,
            "color": "#FF0000"
        }]})
        
        let queue = client.player.createQueue(message.guild.id, {
            data: message
        });

        if(message.member.voice.channelId !== message.guild.me.voice.channelId) {
            message.reply('Вы не в голосовом канале')
            return
        }

        try {
            await queue.join(message.member.voice.channel);
        } catch (error) {
            console.error(error);
            return message.reply({ content: 'Зайдите в голосовой канал!', ephemeral: true });
        }   
        
        try {
            let song = await queue.playlist(args.join(' ')).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
            message.reply({embeds: [{
                title: ":notes: Добавлен плейлист.",
                fields: [{
                    name: `Плейлист:`,
                    value: `[${song}](${song.url})`
                }],
                color: '#000aff'
            }]})
        } catch {
            message.reply('Плейлист не найден!')
        }
    }
}
