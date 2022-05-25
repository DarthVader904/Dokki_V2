module.exports = {
    name: 'songFirst',
	once: false,
    async execute(queue) {
        console.log(`Меня выгнали с голосового канала, очередь закончилась.`);
    }
}