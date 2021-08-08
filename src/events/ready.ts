import { RunFunction } from '../typings/event';
import { GuildMember, User } from 'discord.js';

export const name: string = 'ready';
export const run: RunFunction = async (client) => {
    client.logger.success(`${client.user.tag} is now online!`);
    await client.user.setActivity(`${client.prefix}help | Falcon`, {
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
};