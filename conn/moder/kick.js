const {MessageEmbed, Permissions} = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Выгнать участника.',
    type: 'moder',
    args: true,
    usage: '<user/userId> <reason>',
    async execute(message, args) {
	    if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, вы не можете её использовать!`,
                "color": "#FF0000"
            }]})
        }

        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.reply({embeds: [{
				"title": "**ВНИМАНИЕ**",
				"description": `<:xx:894975989531172875> **${message.author.username}**, у меня недостаточно прав для использования этой команды!`,
				"color": "#FF0000"
			}]})
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if(!member) {
        return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, укажите, кого хотите выгнать!`,
                "color": "#FF0000"
            }]})
        }
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, вы не можете банить модераторов!`,
                "color": "#FF0000"
            }]})
        }
        
        if(member.id === message.author.id) {
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, нельзя бить себя!`,
                "color": "#FF0000"
            }]})
        }
    
        if(!args[1]) {
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, пожалуйста, укажите причину изгнания!`,
                "color": "#FF0000"
            }]})
        }

    let rs = message.cleanContent.split('').slice(5).join('');

    let embed = new MessageEmbed()
        .setTitle("Action: Kicked")
        .setDescription(`Изгнан ${member.user.username} (${member.user.id})`)
        .setColor("#000aff")
        .setFooter(`Изгнал ${message.author.username}`)
        .setTimestamp()
        .addField('Причина', `${rs}`);
        
        message.reply({embeds: [embed]})
        member.kick({reason: rs})

    }
}