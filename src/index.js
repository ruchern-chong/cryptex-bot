const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./../config')
const {token} = require('./../keys')

client.on('ready', () => {
  console.log('Client is ready')
  const server = client.guilds.find('name', 'Cryptex')
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'general')

    if (!channel) return

    channel.send(`
    Welcome ${member} to Cryptex.
    You may start by reading the rules of this server in ${member.guild.channels.find('name', 'welcome-and-faq')}.
    Trading chat on crypto currencies are held in #trading-chat and #trading-voice-text.
    You could also get a good technical analysis on some of the coins or tokens posted by our qualified analysists in #analysis. Do keep a look out for people with the \`Analyst\` role. You could also add the coins or tokens that you are following from teh #commands channel.
    Last but not least, this server is all about sharing. Do note that this server has very strict rules on sharing links with referral links. If you wish to really share something awesome, do remove the referral links before sharing them.
    Thank you and welcome to Cryptex once again. I hope you enjoy your stay!
  `)
  }
)

client.login(token)
