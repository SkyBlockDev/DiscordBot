import {
	Client,
	Message,
	User,
	GuildMember,
	Guild,
	TextChannel,
} from 'discord.js-light';
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
		if (msg.author.id == '336465356304678913') {
			if (cmd == 'eval') {
				msg.reply(await eval(args));
			}
		}
	},
};
