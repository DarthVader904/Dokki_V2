module.exports = {
    name: 'channelEmpty',
	once: false,
    async execute(queue) {
        console.log(`Все покинули Голосовой Канал, очередь закончилась.`);
    }
}