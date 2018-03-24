const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('./../keys')

client.on('ready', () => console.log('Client is ready'))

client.on('message', async message => {
  const { author, channel, guild } = message

  if (message.content === '!invites') {
    let inviteCount = 0

    await guild.fetchInvites().then(invites => {
      invites.forEach(invite => {
        if (invite.inviter === author) inviteCount += invite.uses
      })
    }).catch(error => console.log(error))

    channel.send(`Hi ${author}, you have ${inviteCount} invites.`)
  }
})

client.login(token).then(() => console.log('Successfully logged in.'))
