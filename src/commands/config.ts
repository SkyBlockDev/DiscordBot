import {
	Client,
	Message,
	User,
	GuildMember,
	Guild,
	TextChannel,
} from 'discord.js-light';

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
			console.log(args);
		} else {
			console.log('NOOOOP');
		}
	},
};
