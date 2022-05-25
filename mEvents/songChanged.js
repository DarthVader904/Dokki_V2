module.exports = {
    name: 'songChanged',
	once: false,
    async execute(queue, song) {
        console.log(`Сейчас играет ${song}.`);
        if(queue.repeatMode == '0') {
            queue.data.channel.send({embeds: [{
                title: ":musical_note: Музыка воспроизводится.",
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
        }
    }
}