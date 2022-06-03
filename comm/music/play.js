module.exports = {
    name: "play",
    aliases: ['p'],
    description: "проигрывать музыку",
    type: 'music',
    args: true,
    usage: '<musicName/musicURL>',
    async execute(message, args) {

        if(!args[0]) return message.reply({embeds: [{
            "title": "**ВНИМАНИЕ**",
            "description": `<:xx:894975989531172875> **${message.author.username}**, пожалуйста, укажите ссылку/название на песни!`,
            "color": "#FF0000"
        }], ephemeral: true})
       
        let queue = client.player.createQueue(message.guild.id, {
            data: message
        });
        try {
            await queue.join(message.member.voice.channel);
        } catch (error) {
            console.error(error);
            return message.reply({ content: 'Зайдите в голосовой канал!', ephemeral: true });
        }

        if(message.member.voice.channelId !== message.guild.me.voice.channelId) {
            message.reply('Вы не в голосовом канале')
            return
        }
        
        try {
            let song = await queue.play(args.join(' ')).catch(_ => {
                if(!guildQueue)
                queue.stop();
            });
            message.reply({embeds: [{
                title: ":musical_note: Музыка добавлена.",
                fields: [{
                    name: `Название песни:`,
                    value: `[${song.name}](${song.url})`
                },
                {
                    name: 'Автор:',
                    value: `${song.author}`
                },
                {
                    name: 'Длительность:',
                    value: `${song.duration}`
                }],
                image: {url: `${song.thumbnail}`},
                color: '#000aff'
            }]})
        } catch {
            message.reply('Песня не найдена!')
        }
    }
}
