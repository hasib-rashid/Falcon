import { config } from 'dotenv';
config()

import { RunFunction } from '../../interfaces/Event';
import { GuildMember } from 'discord.js';
import express from 'express';
import Nuggies from 'nuggies'

import { Deta } from 'deta'
import ms from 'ms';
const deta = Deta(process.env.DEFAULT_DB)
const db = deta.Base("muted")

export const name: string = 'ready';
export const run: RunFunction = async (client) => {
	client.logger.success(`${client.user.tag} is now online!`);
	await client.user.setActivity(`${client.prefix}help | 👦 Falcon`, {
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

	Nuggies.giveaways.startAgain(client);

	client.guilds.cache.map((ev) => {
		ev.members.cache.map((member) => {
			// @ts-ignore
			if (member.roles.cache.has(ev?.roles.cache.find(r => r.name.toLowerCase() === 'muted')?.id)) {
				db.fetch({ userID: member.id, guildID: member.guild.id }).then((response) => {
					setInterval(async () => {
						// @ts-ignore
						await member.roles.remove(member.guild.roles.cache.find((role) => role.name.toLowerCase() === "muted"))
						db.delete(response.items[0].key as any)
					}, ms(response.items[0].time as string))
				})
			}
		})
	})

	const app = express();
	app.get('/', (req, res) => res.status(200).json({ msg: '🚀' }));
	app.listen(8080, () =>
		client.logger.success(
			`Webhook app listening on port 8080`
		)
	);
};
