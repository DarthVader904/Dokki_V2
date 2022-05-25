const { RepeatMode, ProgressBar} = require('discord-music-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new_playing')
        .setDescription("проигрывать музыку"),
    async execute(message) {

        let guildQueue = client.player.getQueue(message.guild.id);

        if(!guildQueue) return message.reply('Очередь пуста!');

        let pb = new ProgressBar(guildQueue)

        message.reply({embeds: [{
            title: ":musical_note: Музыка играет.",
            fields: [{
                name: `Название песни:`,
                value: `[${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url})`
            },
            {
                name: 'Автор:',
                value: `${guildQueue.nowPlaying.author}`
            },
            {
                name: 'Длительность:',
                value: `${cBar[pb.bar]} [${pb.times}]`
            }],
            color: '#000aff'
        }]})
        
        let timer = setInterval(() => {
            try{
                let pb = new ProgressBar(guildQueue)
                message.editReply({
                    embeds: [{
                        title: ":musical_note: Музыка играет.",
                        fields: [{
                            name: `Название песни:`,
                            value: `[${guildQueue.nowPlaying.name}](${guildQueue.nowPlaying.url})`
                        },
                        {
                            name: 'Автор:',
                            value: `${guildQueue.nowPlaying.author}`
                        },
                        {
                            name: 'Длительность:',
                            value: `${cBar[pb.bar]} [${pb.times}]`
                        }],
                        color: '#000aff'
                    }]
                })
            } catch {
                message.editReply({
                    embeds: [{
                        description: `:stop_button: Трек окончен`,
                        color: '#000aff'
                    }]
                });
            }
            
        }, 10000); 
        setTimeout(async () => {
            clearInterval(timer); 
            message.editReply({
                embeds: [{
                    description: `:stop_button: Трек окончен`,
                    color: '#000aff'
                }]
            });
        }, guildQueue.nowPlaying.milliseconds);


    }
};