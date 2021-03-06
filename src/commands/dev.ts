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
	catagory: 'dev',
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
		if (cmd == 'eval') {
			msg.reply(await eval(args));
		}
	},
};
