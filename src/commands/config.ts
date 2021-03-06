import {
	Client,
	Message,
	User,
	GuildMember,
	Guild,
	TextChannel,
} from 'discord.js-light';
import { Cprefixes } from '../index';
module.exports = {
	catagory: 'config',
	async execute(
		msg: Message,
		client: Client,
		args: string,
		cmd: string,
		user: User,
		member: GuildMember,
		prefix: string
	) {
		const send = msg.channel.send;
		const channel = msg.channel as TextChannel;
		const guild = msg.guild as Guild;
		if (cmd == 'prefix') {
			await Cprefixes.ensure(guild.id, {
				prefix: '',
			});
			if (!args) {
				return channel.send('my prefix is ' + prefix);
			} else {
				if (!msg.member.permissions.has('ADMINISTRATOR'))
					return channel.send(
						"you need to be a 'ADMINISTRATOR' to use this command"
					);
				Cprefixes.set(guild.id, args, 'prefix');
				msg.channel.send('Updated the prefix to ' + args);
			}
		}
	},
};
