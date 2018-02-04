const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('./keys')

client.on('ready', () => {
    console.log('I am ready!')
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'general')

    if (!channel) return

    channel.send(`Welcome ${member} to Cryptex. Enjoy your stay!`)
})

client.login(token)