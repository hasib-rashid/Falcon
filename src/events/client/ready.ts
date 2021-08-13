import { RunFunction } from '../../interfaces/Event';
import { GuildMember } from 'discord.js';
import express from 'express';

export const name: string = 'ready';
export const run: RunFunction = async (client) => {
	client.logger.success(`${client.user.tag} is now online!`);
	await client.user.setActivity(`${client.prefix}help | 👦 Spencer`, {
		type: 'WATCHING',
	});
	if (client.config.onlyUsed) {
		client.guilds.cache
			.get('784470505607528448')
			.roles.cache.get('809733163252187156')
			.members.map((value: GuildMember) => {
				client.config.onlyUsed.push(value.id);
			});
	}

	const app = express();
	app.get('/', (req, res) => res.status(200).json({ msg: '🚀' }));
	app.listen(8080, () =>
		client.logger.success(
			`Webhook app listening on port 8080`
		)
	);
};
