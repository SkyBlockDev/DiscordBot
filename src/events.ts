import { Client } from 'discord.js-light';
module.exports = {
	execute(client: Client) {
		client.on('ready', () => {
			console.log('ready');
		});
	},
};
