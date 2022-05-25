module.exports = {
    name: 'songAdd',
	once: false,
    async execute(queue, song) {
        console.log(`Песня ${song} добавлена​ в очередь.`);
    }
}