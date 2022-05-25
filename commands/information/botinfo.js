const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Информация о боте.'),
    async execute(msg) {
        let embed = new MessageEmbed()
            .setTitle(`Информация о ${client.user.tag}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField("Дата регистрации", `<t:${Math.floor(client.user.createdAt/1000)}:f>\n<t:${Math.floor(client.user.createdAt/1000)}:R>`)
            .addField('Версия', `v${version}`)
            .addField('Количество серверов', `Бот на ${client.guilds.cache.size} серверах.`)
            .addField('Дополнительная информация', `[Ссылка на сервер поддержки](https://discord.gg/Gjn695AYHN)
[Ссылка на приглашение бота](https://discord.com/api/oauth2/authorize?client_id=578946035347357706&permissions=8&scope=bot%20applications.commands)`)
            .setColor('#000aff')
            .setTimestamp()
            .setFooter({text: `ID: ${client.user.id}`})
        await msg.reply({embeds: [embed]})
    }
}