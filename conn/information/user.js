const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'user',
    description: 'Отобразить информацию о участнике.',
    type: 'info',
    args: false,
    usage: '<user/userId>',
    async execute(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        
        let statuses = {
            online: 'В сети',
            idle: 'Нет на месте',
            dnd: 'Не беспокоить',
            offline: 'Не в сети'
        };
        let stat = `Имеет статус **${statuses[member.presence?.status]}**`;

        let type = member.presence?.activities[0]?.type
        let name = member.presence?.activities[0]?.name
        
        let game;
        if (type === 'PLAYING') game = `Играет в **${name}**`;
        else if (type === 'STREAMING') game = `Стримит **[${name}](${member.presence?.activities[0]?.url})**`;
        else if (type === 'LISTENING') game = `Слушает **${name}**`;
        else if (type === 'WATCHING') game = `Смотрит **${name}**`;
        else game = 'Нет активностей.';
        
        let embed = new MessageEmbed()
            .setTitle(`Информация о ${member.user.tag}`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .addField("Дата регистрации", `<t:${Math.floor(member.user.createdTimestamp/1000)}:f>\n<t:${Math.floor(member.user.createdTimestamp/1000)}:R>`)
            .addField("Дата вступления", `<t:${Math.floor(member.joinedTimestamp/1000)}:f>\n<t:${Math.floor(member.joinedTimestamp/1000)}:R>`)
            .addField('Статус', `${stat}`)
            .addField('Активность', `${game}`)
            .addField('Роли', `${member.roles.cache.filter((r) => r.id !== message.guild.id).map((r) => r).join(", ") || "Не имеет."}`)
            .setColor('#000aff')
            .setTimestamp()
            .setFooter({text: `ID: ${member.id}`});
        await message.reply({embeds: [embed]});
    }
};
