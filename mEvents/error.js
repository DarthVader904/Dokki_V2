module.exports = {
    name: 'error',
	once: false,
    async execute(error, queue) {
        console.log(`Ошибка: ${error} в ${queue.guild.name}`);
    }
}