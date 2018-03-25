const Discord = require('discord.js')
const client = new Discord.Client()
const { token } = require('./../keys')

client.on('ready', () => console.log('Client is ready'))

client.on('message', async message => {
  const { member, channel, guild } = message

  if (message.content === '!invites') {
    const stripEmoji = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g

    const inviteRoles = [
      { name: 'Viscount', threshold: 250 },
      { name: 'Czar', threshold: 100 },
      { name: 'Inquisitor', threshold: 10 },
      { name: 'Commissioner', threshold: 2 }
    ]

    let invites, userInvites
    let inviteCount = 0

    await guild.fetchInvites().then(response => invites = response).catch(error => console.log(error))

    userInvites = invites.filter(invite => invite.inviter === member.user)

    userInvites.forEach(userInvite => {
      inviteCount += userInvite.uses
    })

    const roleToBeAdded = inviteRoles.find(inviteRole => inviteCount >= inviteRole.threshold)

    const roleId = guild.roles.find(guildRole => guildRole.name.replace(stripEmoji, '').includes(roleToBeAdded.name)).id

    member.addRole(roleId).then(() => console.log('Member assigned with respective role.'))

    channel.send(`Hi ${member}, you have ${inviteCount} invites.`)
  }
})

client.login(token).then(() => console.log('Successfully logged in.'))
