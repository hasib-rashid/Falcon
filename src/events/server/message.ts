import { Message, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Anything } from '../../interfaces/Anything';

import { Deta } from 'deta'
import { env } from '../../client/env';

const deta = Deta(env.db)
const guildModel = deta.Base("guild")
const blacklistModel = deta.Base("blacklist")

export const name: string = 'message';
export const run: RunFunction = async (client, message: Message) => {
	if (message.partial) await message.fetch();
	if (message.member?.partial) await message.member.fetch();
	if (!message.guild) return;
	if (message.author.bot) return;

	const guildCache = await guildModel.fetch({ guildID: message.guild.id })

	let Prefix: any;

	try {
		Prefix = guildCache.items[0].prefix
	} catch (err) {
		Prefix = client.prefix
	}

	const blacklistedData = await blacklistModel.fetch({ userID: message.author.id })


	if (!message.content.toLowerCase().startsWith(Prefix)) return;
	const [cmd, ...args]: string[] = message.content
		.slice(Prefix.length)
		.trim()
		.split(/ +/g);

	const command: Anything = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));

	if (client.config.onlyUsed) {
		if (!client.config.onlyUsed.includes(message.author.id)) return;
	}

	if (!cmd.length) return;
	if (command) {
		if (!blacklistedData.items) {
			if (
				command.ownerOnly &&
				command.ownerOnly == true &&
				!client.owners.includes(message.author.id)
			)
				return;
			if (client.cooldowns.has(`${message.author.id}${command.name}`)) {
				const cooldownTime: string = client.utils.formatMS(
					client.cooldowns.get(`${message.author.id}${command.name}`) - Date.now()
				);
				return message.channel.send(`**You can use this command again in \`${cooldownTime.split('').length == 0 ? '1 second' : cooldownTime}\`**`)
			}
			client.cooldowns.set(
				`${message.author.id}${command.name}`,
				client.utils.checkMultipleRoles('784470505607528448', message.author.id, [
					'787656384808353803',
					'787656420258086922',
					'787656471679991829',
				])
					? Date.now() + command?.cooldown / 2
					: Date.now() + command?.cooldown
			);

			command.run(client, message, args).catch((e: Error) => {
				client.logger.error(e);
				message.channel
					.send(
						client.embed(
							{
								title: `❌ An error came about..`,
								description: `\`\`\`\n${e.message}\`\`\`\nPlease join [Falcon Support](https://discord.gg/22TtDpJcNE) and report it.`,
							},
							message
						)
					)
					.catch(() => client.logger.error("Can't send error message"));
				if (e?.message?.toLowerCase()?.includes('missing permissions') || false)
					return;
				return (
					client.channels.cache.get('875785159331434607') as TextChannel
				).send(
					client.embed(
						{
							title: `❌ An error came about..`,
							description: `\`\`\`\n${e.stack}\`\`\`\n\`\`\`\n${e.message
								}\`\`\`\nNOTES: GID: ${message.guild.id} | UID: ${message.author.id
								} | CMD: ${command.name} | ARGS: ${args.join(' ')}`,
						},
						message
					)
				);
			});

			setTimeout(
				() => {
					client.cooldowns.delete(`${message.author.id}${command.name}`);
				},
				client.utils.checkMultipleRoles('784470505607528448', message.author.id, [
					'787656384808353803',
					'787656420258086922',
					'787656471679991829',
				])
					? command?.cooldown / 2
					: command?.cooldown
			);

			if (command.userPermissions) {
				if (!message.member.permissions.has(command.userPermissions))
					return message.channel.send(
						client.embed(
							{
								color: "BLUE",
								description: `You need to have ${typeof command.userPermissions == 'string' ||
									command.userPermissions.length == 1
									? `\`${typeof command.userPermissions == 'string'
										? command.userPermissions
											.replace(/_/gi, ' ')
											.split(/ +/g)
											.map(
												(value: string) =>
													value[0].toUpperCase() +
													value.slice(1).toLowerCase()
											)
											.join(' ')
										: command.userPermissions[0]
											.replace(/_/gi, ' ')
											.split(/ +/g)
											.map(
												(value: string) =>
													value[0].toUpperCase() +
													value.slice(1).toLowerCase()
											)
											.join(' ')
									}\``
									: `all of these permissions: ${command.userPermissions
										.map(
											(value: string) =>
												`\`${value
													.toLowerCase()
													.replace(/_/gi, ' ')
													.split(/ +/g)
													.map(
														(value: string) =>
															value[0].toUpperCase() +
															value.slice(1).toLowerCase()
													)
													.join(' ')}\``
										)
										.join(', ')}`
									}`,
								title: `❌ You can't use that!`,
							},
							message
						)
					);
			}
		} else {
			return message.channel.send("**You are blacklisted by the owner. Contact him if you want to know how you can get whitelisted again.**")
		}
	}
};
