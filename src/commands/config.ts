import { Client, Message } from 'discord.js-light';
module.exports = {
	catagory: 'config',
	execute(message, client, args, command, usr, memb) {
		console.log('EEEE');
		if (command == 'test') {
			console.log('test');
		} else console.log('failed');
	},
};
