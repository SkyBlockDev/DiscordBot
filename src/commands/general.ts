import {
	Client,
	Message,
	User,
	GuildMember,
	Guild,
	TextChannel,
	MessageEmbed,
} from 'discord.js-light';
import { Cprefixes } from '../index';
module.exports = {
	catagory: 'general',
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
		console.log(cmd == 'avatar');
		if (cmd == 'avatar') {
			const embed = new MessageEmbed()
				.setTitle(`${member}'s Avatar`)
				.setURL(member.user.displayAvatarURL({ dynamic: true }))
				.setImage(member.user.displayAvatarURL({ dynamic: true }));
			send(embed);
		}
	},
};
