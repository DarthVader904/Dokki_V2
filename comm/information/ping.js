module.exports = {
    name: "ping",
    description: "Отобразить задержку API.",
    type: 'info',
    args: false,
    execute(message) {
        message.channel.send(`🏓 API задержка ${Math.round(message.client.ws.ping)}ms`)
    }
}