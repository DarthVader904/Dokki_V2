const {MessageEmbed} = require('discord.js')

module.exports = {
	name: 'server',
	description: 'Отобразить информацию о сервере.',
    type: 'info',
    args: false,
    async execute(message) {
    	
        const guild = message.guild
        const owner = await message.guild.fetchOwner();
        let guildDescription = guild.description
        if (!guildDescription) {
            guildDescription = 'None'
        }
        let offline = guild.members.cache.filter(members => members.presence != null && members.presence.status === 'offline').size + guild.members.cache.filter(members => members.presence == null).size
    
		let tier = {
		    NONE: 'Отсутствует',
	        TIER_1: 'Уровень 1',
		    TIER_2: 'Уровень 2',
		    TIER_3: 'Уровень 3'
		}
		
        const embed = new MessageEmbed()
        .setTitle('Информация.')
        .setDescription('Это информация о вашем сервере.')
        .setColor("#000aff")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields({
            name: 'Имя',
            value: (`:european_castle: ${guild.name}`),
            inline: true
        },
        {
            name: 'Создан в',
            value: (`:calendar: ${guild.createdAt.toDateString()}`),
            inline: true
        },
        {
            name: 'Владелец',
            value: (`👑 ${owner.user.tag}`),
            inline: true
        },
        {
            name: 'Каналы',
            value: (`:speech_balloon: всего ${guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size}\n:hash: текстовые ${guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}\n:loud_sound: голосовые ${guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}`),
            inline: true
        },
        {
            name: 'Статус сервера',
            value: (`<:online:802628842803429398> онлайн ${guild.members.cache.filter((m) => m.presence?.status === 'online').size}\n<:idle:889422153534046229>неактивен ${guild.members.cache.filter((m) => m.presence?.status === 'idle').size}\n<:dnd:889422153785692170>не беспокоить ${guild.members.cache.filter((m) => m.presence?.status === 'dnd').size}\n<:offline:802628985196249089> оффлайн ${offline}`)
        },
        {
            name: 'Количество участников',
            value: (`:busts_in_silhouette: Всего ${guild.memberCount.toString()}\n:bust_in_silhouette: Человек ${guild.members.cache.filter((m) => !m.user.bot).size}\n<:botjs:803366173458563072> Ботов ${guild.members.cache.filter((m) => m.user.bot).size}`)
        },
        {
            name: 'Колличество ролей',
            value: (`:notepad_spiral: ${guild.roles.cache.filter((r) => r.id !== guild.id).size}`),
            inline: true
        },
        {
            name: 'Бустов',
            value: (`<:bust:897356182191210516> ${guild.premiumSubscriptionCount.toString()}`),
            inline: true
        },
        {
            name: 'Уровень буста', 
            value: (`<:bust:897356182191210516> ${tier[guild.premiumTier]}`), 
            inline: true
        })
        .setTimestamp()
        .setFooter({text: `ID ${guild.id}`});

        message.reply({ embeds: [embed] })
    },
};