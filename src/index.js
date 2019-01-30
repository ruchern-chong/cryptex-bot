import Discord from 'discord.js'
import { token } from '../keys'
import { stripEmoji } from './helpers'

const client = new Discord.Client()

client.on('ready', () => console.log('Client is ready'))

client.on('message', async message => {
  const { member, channel, guild } = message

  if (message.content === `!invites`) {
    const inviteRoles = [
      { name: 'Viscount', threshold: 250 },
      { name: 'Czar', threshold: 100 },
      { name: 'Inquisitor', threshold: 10 },
      { name: 'Commissioner', threshold: 2 }
    ]

    let invites, userInvites
    let inviteCount = 0

    await guild
      .fetchInvites()
      .then(response => (invites = response))
      .catch(error => console.error(error))

    userInvites = invites.filter(invite => invite.inviter === member.user)

    userInvites.forEach(userInvite => (inviteCount += userInvite.uses))

    const roleToBeAdded = inviteRoles.find(
      inviteRole => inviteCount >= inviteRole.threshold
    )

    const roleId = guild.roles.find(guildRole =>
      stripEmoji(guildRole.name).includes(roleToBeAdded.name)
    ).id

    member
      .addRole(roleId)
      .then(() => console.log('Member assigned with respective role.'))

    channel.send(`Hi ${member}, you have ${inviteCount} invites.`)
  }
})

client
  .login(token)
  .then(() => console.log('Successfully logged in.'))
  .catch(error => console.error(error))
