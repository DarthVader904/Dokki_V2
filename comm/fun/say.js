const { Permissions } = require('discord.js');

module.exports = {
		name: 'say',
		description: 'Написать текст',
		
	async execute(interaction) {
		
		let args = interaction.cleanContent.split('').slice(5).join(''); 

    	interaction.delete().catch();
		
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply("Недостаточно прав на использование команды!"); 
    
    	if (args) return interaction.channel.send(`${args}`);
		return interaction.reply(`Укажите текст`)
    
	}
}
		