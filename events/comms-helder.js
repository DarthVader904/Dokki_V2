const fs = require('fs')
const {Collection} = require('discord.js');

client.comms = new Collection();

const commFolders= fs.readdirSync('./comm');

for (const folder of commFolders) {
    const commFiles = fs.readdirSync(`./comm/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commFiles) {
        const comms = require(`../comm/${folder}/${file}`);
        client.comms.set(comms.name, comms);
        console.log(`comm | ${folder} | ${file} загружен!`);
    }
}

module.exports = {
    name: 'messageCreate',
	once: false,
    async execute(message) {
        const prefix = '*';

        if (!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commName = args.shift().toLowerCase();
        const comm = client.comms.get(commName) || client.comms.find(cmd => cmd.aliases && cmd.aliases.includes(commName));
        if (comm.args && !args.length) {
            let reply = `Вы не предоставили никаких аргументов, ${message.author}!`;

	        if (comm.usage) {
	        	reply += `\nПравильное использование: \`${prefix}${comm.name} ${comm.usage}\``;
	        }

            return message.channel.send(reply);
        }

        if (!comm) return;
        
        try {
            comm.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply({ content: 'При выполнении этой команды произошла ошибка!', ephemeral: true });
        }
    }
}
