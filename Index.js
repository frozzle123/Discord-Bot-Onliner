const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!dm') {
        const guild = message.guild;
        if (!guild) return;

        const members = guild.members.cache;

        members.forEach(member => {
            if (!member.user.bot) {
                member.send('Hello! This is a test message from the bot.')
                    .catch(console.error);
            }
        });

        message.channel.send('DMs have been sent to all members.');
    }
});

client.login(process.env.BOT_TOKEN);
