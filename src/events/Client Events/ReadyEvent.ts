import { RunFunction } from '../../interfaces/Event';
import { Document } from 'mongoose';
import { Anything } from '../../interfaces/Anything';
import { GuildMember, User } from 'discord.js';
import express from 'express';
import ms from 'ms';

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
	if (client.config.webAuth) {
		const server = express();
		server.get('/', (req, res) => res.status(200).json({ msg: '🚀' }));
		server.listen(client.config.webPort, () =>
			client.logger.success(
				`Webhook server listening on port ${client.config.webPort}`
			)
		);
	}
};
