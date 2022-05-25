const { ProgressBar } = require('discord-music-player');

module.exports = {
    name: "newplaying",
    aliases: ['np'],
    description: "проигрывать музыку",
    type: 'music',
    args: false,
    async execute(message) {

        let guildQueue = client.player.getQueue(message.guild.id);

        if(!guildQueue) return message.reply('Очередь пуста!');

        let pb = new ProgressBar(guildQueue)

        const a = await message.reply({embeds: [{
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
                a.edit({
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
                a.edit({
                    embeds: [{
                        description: `:stop_button: Трек окончен`,
                        color: '#000aff'
                    }]
                });
            }  
        }, 10000); 
        setTimeout(async () => {
            clearInterval(timer); 
            a.edit({
                embeds: [{
                    description: `:stop_button: Трек окончен`,
                    color: '#000aff'
                }]
            });
        }, guildQueue.nowPlaying.milliseconds); 

    }
};