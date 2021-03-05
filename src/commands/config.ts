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
		member: GuildMember
	) {
		const channel = msg.channel as TextChannel;
		const guild = msg.guild as Guild;
		if (cmd == 'prefix') {
			await Cprefixes.ensure(guild.id, {
				prefix: '',
			});
			if (!args) {
				const item = Cprefixes.get(guild.id, 'prefix');
				if (item) return channel.send('my prefix is ' + item || '!');
			} else {
				if (!msg.member.permissions.has('ADMINISTRATOR'))
					return channel.send(
						"you need to be a 'ADMINISTRATOR' to use this command"
					);
				Cprefixes.set(guild.id, args, 'prefix');
				msg.channel.send('Updated the prefix to ' + args);
			}
		} else {
			console.log('NOOOO');
		}
	},
};
