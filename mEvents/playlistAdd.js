module.exports = {
    name: 'playlistAdd',
	once: false,
    async execute(queue, playlist) {
        console.log(`Плейлист ${playlist} с ${playlist.songs.length} добавлен в очередь.`);
    }
}