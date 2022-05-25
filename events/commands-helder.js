const fs = require('fs')
const {Collection} = require('discord.js');

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        console.log(`command | ${folder} | ${file} загружен!`);
    }
}

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		if (!interaction.isCommand()) return;
    
        const { commandName } = interaction;
        
        const command = client.commands.get(interaction.commandName);
        console.log(commandName)
        if (!command) return;
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'При выполнении этой команды произошла ошибка!', ephemeral: true });
        }
	},
};