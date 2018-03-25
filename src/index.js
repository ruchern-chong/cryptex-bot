const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('./../keys')

client.on('ready', () => console.log('Client is ready'))

client.on('message', async message => {
  const { author, channel, guild } = message

  if (message.content === '!invites') {
    let entries
    let inviteCount = 0

    const options = { user: author, type: 40 }

    await guild.fetchAuditLogs(options).then(audit => {
      entries = audit.entries
    })

    entries.forEach(entry => {
      if (entry.target.uses) {
        inviteCount += entry.target.uses
      }
    })

    channel.send(`Hi ${author}, you have ${inviteCount} invites.`)
  }
})

client.login(token).then(() => console.log('Successfully logged in.'))
