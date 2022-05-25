const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Информация о пользователе.')
        .addUserOption(option => option.setName('target').setDescription('Упоминание пользователя.')),
    async execute(msg) {
    const member = msg.options.get('target') || msg.member
    
    let statuses = {
        online: 'В сети',
        idle: 'Нет на месте',
        dnd: 'Не беспокоить',
        offline: 'Не в сети'
    };
    let stat = `Имеет статус **${statuses[member.presence?.status]}**`;
    
    let type = member.presence?.activities[0]?.type;
    let name = member.presence?.activities[0]?.name;
    
    let game;
    if (type === 'PLAYING') game = `Играет в **${name}**`;
    else if (type === 'STREAMING') game = `Стримит **[${name}](${member.presence?.activities[0]?.url})**`;
    else if (type === 'LISTENING') game = `Слушает **${name}**`;
    else if (type === 'WATCHING') game = `Смотрит **${name}**`;
    else game = 'Нет активностей.';
    
    let embed = new MessageEmbed()
        .setTitle(`Информация о ${member.tag}`)
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .addField("Дата регистрации", `<t:${Math.floor(member.user.createdTimestamp/1000)}:f>\n<t:${Math.floor(member.user.createdTimestamp/1000)}:R>`)
        .addField("Дата вступления", `<t:${Math.floor(member.joinedTimestamp/1000)}:f>\n<t:${Math.floor(member.joinedTimestamp/1000)}:R>`)
      	.addField('Статус', `${stat}`)
      	.addField('Активность', `${game}`)
        .addField('Роли', `${member.roles.cache.filter((r) => r.id !== msg.guild.id).map((r) => r).join(", ") || "Не имеет."}`)
        .setColor('#000aff')
        .setTimestamp()
        .setFooter({text:`ID: ${member.id}`});
    await msg.reply({embeds: [embed]});


}
};