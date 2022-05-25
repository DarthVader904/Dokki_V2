module.exports = {
    name: 'songFirst',
	once: false,
    async execute(queue, song) {
        console.log(`Начал играть ${song}.`);
    }
}