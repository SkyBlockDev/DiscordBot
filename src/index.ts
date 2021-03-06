/** Imports */
import { credentials, settings, google } from './Settings';
import { readdirSync, mkdir, existsSync } from 'fs';
import { join } from 'path';
import {
	Client,
	Message,
	Collection,
	GuildMember,
	User,
} from 'discord.js-light';
import Enmap from 'enmap';
/** ----------------------- */
/** defining stuff */
const commands = new Collection();
let usr: User;
let memb: GuildMember;
/** ----------------------- */
/** DataBase Directory */
if (!existsSync('./DATABASE')) {
	mkdir('./DATABASE', (MONKEY) => {
		console.log('MADE DATABASE DIRECTORY');
	});
}
/** DataBase */
export const Cprefixes = new Enmap({
	name: 'prefixes',
	dataDir: join(__dirname, '..', 'DATABASE'),
	polling: false,
	fetchAll: false,
	ensureProps: true,
	autoFetch: true,
});
/** ----------------------- */
/** Making the client */
const client = new Client({
	cacheGuilds: true,
	cacheChannels: false,
	cacheOverwrites: false,
	cacheRoles: false,
	cacheEmojis: false,
	cachePresences: false,
	disabledEvents: events(),
});
/** ----------------------- */
/** Loading Commands */
const commandFiles = readdirSync(join(__dirname, 'commands')).filter((file) =>
	file.endsWith('.js')
);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command?.catagory, command);
}

/** Loading Listeners */
const listeners = require('./events');
listeners.execute(client);

/** Getting the commands */
const cmds = [
	commands.get('config'),
	commands.get('dev'),
	commands.get('index'),
	commands.get('general'),
];
/* --------------------------------
Command Handler
-------------------------------- */
client.on('message', async (message: Message) => {
	/** Ignoring Bots */
	if (message.author.bot) return;
	/** Getting Prefix */
	const prefix = Cprefixes.get(message.guild.id, 'prefix')
		? Cprefixes.get(message.guild.id, 'prefix')
		: settings.prefix;
	/** Checking Prefix */
	if (
		!message.content.startsWith(`<@!${client.user.id}>`) &&
		!message.content.startsWith(prefix)
	)
		return;

	if (message.guild.me.hasPermission('SEND_MESSAGES')) return;

	/** Command Defining */
	let command = message.content;

	/** Stuff */
	if (command.startsWith(`<@!${client.user.id}>`)) {
		command = command.replace(`<@!${client.user.id}>`, '');
	} else if (command.startsWith(prefix)) {
		command = command.replace(prefix, '');
	}
	command = command?.replace(/  /, ' ')?.trim();
	if (command[0] == ' ') command.slice(1);
	command = command.split(' ')[0];

	/** Args */
	let args = message.content.replace(command, '');

	/** Removing Prefix */
	if (args.startsWith(`<@!${client.user.id}>`)) {
		args = args.replace(`<@!${client.user.id}>`, '');
	} else if (args.startsWith(prefix)) {
		args = args.replace(prefix, '');
	}
	args = args.trim();

	/** Trying to get members */
	try {
		usr = await GetUser(args, message);
		memb = await Member(args, message);
	} catch (e) {}
	/** running the command */
	try {
		console.log(command);
		for (let commandFiles of cmds) {
			(commandFiles as CommandInterface).execute(
				message,
				client,
				args,
				command,
				usr || null,
				memb || null,
				prefix
			);
		}
	} catch (e) {
		console.error;
	}
});
/* --------------------------------
Logging in
-------------------------------- */
client.login(credentials.token);

/* --------------------------------
Catching Errors
-------------------------------- */
process.on('uncaughtException', (error) => {
	console.log(error.stack);
});
process.on('UnhandledPromiseRejectionWarning', (error) => {
	console.log(error);
});

/* --------------------------------
User Code
-------------------------------- */
async function GetUser(args: string, msg: Message) {
	let user: User;
	try {
		const stuff = args.split(' ')[0];
		user = await client.users.fetch(stuff);
		if (!user) {
			user = msg.guild.members.cache.find((member) => {
				return (
					member.displayName.toLowerCase().includes(stuff) ||
					member.user.tag.toLowerCase().includes(stuff)
				);
			}).user;
			if (!user) {
				user = msg.guild.members.cache.get(stuff).user;
			}
			if (!user) {
				if (stuff == '^' && msg.channel.messages.cache.size >= 4) {
					user = (msg.channel.messages.cache
						.filter((m) => m.id < msg.id && m.author.id != msg.author.id)
						.last().member as GuildMember).user;
				}
			}
		}
		return user || null;
	} catch (err) {
		return null;
	}
}
/* --------------------------------
Member Code
-------------------------------- */
async function Member(args: string, msg: Message) {
	let member: GuildMember;
	try {
		const stuff = args.split(' ')[0];
		if (!member) {
			member = msg.guild.members.cache.find((member) => {
				return (
					member.displayName.toLowerCase().includes(stuff) ||
					member.user.tag.toLowerCase().includes(stuff)
				);
			});
			if (!member) {
				member = msg.guild.members.cache.get(stuff);
			}
			if (!member) {
				if (stuff == '^' && msg.channel.messages.cache.size >= 4) {
					member = msg.channel.messages.cache
						.filter((m) => m.id < msg.id && m.author.id != msg.author.id)
						.last().member as GuildMember;
				}
			}
		}
		if (member && member.id) member = await msg.guild.members.fetch(member.id);
		return member || null;
	} catch (e) {
		return null;
	}
}
/* --------------------------------
Command Interface
-------------------------------- */
interface CommandInterface {
	execute(
		message: Message,
		client: Client,
		args: string,
		command: string,
		usr: User,
		memb: GuildMember,
		prefix: string
	);
}
/* --------------------------------
Events
-------------------------------- */
function events(): string[] {
	const events = [
		'channelCreate',
		'channelDelete',
		'channelPinsUpdate',
		'channelUpdate',
		'debug',
		'emojiCreate',
		'emojiDelete',
		'emojiUpdate',
		'error',
		'guildBanAdd',
		'guildBanRemove',
		'guildCreate',
		'guildDelete',
		'guildIntegrationsUpdate',
		'guildMemberAdd',
		'guildMemberAvailable',
		'guildMemberRemove',
		'guildMembersChunk',
		'guildMemberSpeaking',
		'guildMemberUpdate',
		'guildUnavailable',
		'guildUpdate',
		'invalidated',
		'inviteCreate',
		'inviteDelete',
		'messageDelete',
		'messageDeleteBulk',
		'messageReactionAdd',
		'messageReactionRemove',
		'messageReactionRemoveAll',
		'messageReactionRemoveEmoji',
		'presenceUpdate',
		'rateLimit',
		'roleCreate',
		'roleDelete',
		'roleUpdate',
		'shardDisconnect',
		'shardError',
		'shardReady',
		'shardReconnecting',
		'shardResume',
		'typingStart',
		'userUpdate',
		'voiceStateUpdate',
		'warn',
		'webhookUpdate',
	];
	return events;
}
