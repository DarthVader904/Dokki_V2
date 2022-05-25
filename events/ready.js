module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        setInterval(() => { 
            client.user.setActivity('*help', {type: "PLAYING"});
            setTimeout(() => {
                client.user.setActivity(`Slash commands`, {type: "WATCHING"});
                setTimeout(() => {
                    client.user.setActivity(`@Dokki | Servers: ${client.guilds.cache.size}`, {type: "LISTENING"});
                }, 10000)
            }, 10000)
        }, 30000)
	},
};