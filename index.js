const fs = require('fs')
const {Client, Intents} = require('discord.js');
const {token} = require('./config.json');
const {version} = require('./package.json');
const {Player} = require("discord-music-player");
let cBar = require('./cBar.json');
global.cBar = cBar;
global.version = version
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES]
});
const player = new Player(client, {
    leaveOnEmpty: true,
    leaveOnStop: true,
    volume: 100
});
client.player = player;

const mEventFiles = fs.readdirSync('./mEvents').filter(file => file.endsWith('.js'));

for (const file of mEventFiles) {
	const mEvent = require(`./mEvents/${file}`);
	if (mEvent.once) {
		client.player.once(mEvent.name, (...args) => mEvent.execute(...args));
	} else {
		client.player.on(mEvent.name, (...args) => mEvent.execute(...args));
	}
}

process.on('unhandledRejection', async (error, message) => {
    const channel = client.channels.cache.get('939103950769111050')
    if (channel) await channel.send({
        embeds: [{
            timestamp: {},
            color: "000aff",
            title: `Возникла ошибка!`,
            description: `\n\`\`\`fix\n${error.stack.slice(0, 1024)}\n\`\`\``
        }]
    })
})

global.client = client

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);