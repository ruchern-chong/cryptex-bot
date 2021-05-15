import Discord, { Message } from 'discord.js';

import { inviteRoles } from './config';
import { stripEmoji } from './helpers/stripEmoji';
import { Role } from './types';

require('dotenv').config();

const client = new Discord.Client({
  disableMentions: 'everyone'
});

client.on('ready', () => console.info('Client is ready'));

client.on('message', async (message: Message) => {
  const { channel, content, guild, member } = message;
  const { user } = member;

  if (content === `!invites`) {
    let invites, userInvites;
    let inviteCount: number = 0;

    await guild
      .fetchInvites()
      .then((response) => (invites = response))
      .catch((err: Error) => console.error(err));

    userInvites = invites.filter(({ inviter }) => inviter === user);

    userInvites.forEach(({ uses }) => (inviteCount += uses));

    const roleToBeAdded: Role = inviteRoles.find(
      (inviteRole: Role) => inviteCount >= inviteRole.threshold
    );

    const roleId: string = guild.roles.cache.find((role: Role) =>
      stripEmoji(role.name).includes(roleToBeAdded.name)
    ).id;

    member.roles
      .add(roleId)
      .then(() =>
        console.info('Member have been assigned with the respective role.')
      );

    await channel.send(`Hi ${member}, you have ${inviteCount} invites.`);
  }
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.info('Successfully logged in.'))
  .catch((err: Error) => console.error(err));
