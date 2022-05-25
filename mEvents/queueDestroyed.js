module.exports = {
    name: 'queueDestroyed',
	once: false,
    async execute(queue) {
        console.log(`Очередь была уничтожена.`);
    }
}