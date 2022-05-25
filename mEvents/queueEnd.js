module.exports = {
    name: 'queueEnd',
	once: false,
    async execute(queue) {
        console.log(`Очередь закончилась.`)
        queue.data.channel.send(':stop_button: Сеанс окончен');
    }
}