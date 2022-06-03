const { Permissions } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'mute',
	description: 'Замутить участника.',
    type: 'moder',
    args: true,
    usage: '<user/userId> <time> <reason>',
	async execute(message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, вы не можете её использовать!`,
                "color": "#FF0000"
            }]})
        }

        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
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
                "description": `<:xx:894975989531172875> **${message.author.username}**, укажите, кого хотите замутить!`,
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

        if(member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, вы не можете мутить модераторов!`,
                "color": "#FF0000"
            }]})
        }

        let mutetime = args[1]
        
        if(!mutetime){
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, укажите время мута!`,
                "color": "#FF0000"
            }]})
        }

        if(!args[2]) {
            return message.reply({embeds: [{
                "title": "**ВНИМАНИЕ**",
                "description": `<:xx:894975989531172875> **${message.author.username}**, пожалуйста, укажите причину мута!`,
                "color": "#FF0000"
            }]})
        }

        try {
            member.timeout(ms(mutetime), `${message.author.username}|${ms(ms(mutetime))}|${args.slice(2,30)}`)
            message.reply({embeds: [{
                title: "Action: mute",
                description: `<:__:894975989145288795> Замьючен ${member.user.username} (${member.id}) на ${ms(ms(mutetime))}`,
                color: "#000aff",
                footer: {
                    text: `Замьютил ${message.author.username}`
                }
            }]});
        } catch(err) {
            message.reply('Вы что-то сделали не так')
        }
    }
}