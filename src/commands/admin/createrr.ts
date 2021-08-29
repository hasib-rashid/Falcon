import { ReactionRoleManager } from 'discord-collector';
import { PermissionResolvable } from 'discord.js';
import Falcon from '../../base/Client';
import { RunFunction } from '../../interfaces/Command';

export const name = 'createrr'
export const category = 'admin'
export const description = 'Create a Reaction role'
export const userPermissions: PermissionResolvable = "MANAGE_ROLES"

export const run: RunFunction = async (client: Falcon, message, args) => {
    try {
        if (!message.member.permissions.has("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );

        const role = message.mentions.roles.first();
        if (!role) {
            message.reply('You need mention a role').then(m => setTimeout((async () => { await m.delete() }), 1000));
            return;
        }


        const emoji = args[1];
        if (!emoji) {
            message.reply('You need use a valid emoji.').then(m => setTimeout((async () => { await m.delete() }), 1000));
            return;
        }

        const msg = await message.channel.messages.fetch(args[2] || message.id);
        if (!role) {
            message.reply('Message not found! Wtf...').then(m => setTimeout((async () => { await m.delete() }), 1000));
            return;
        }

        const reactionRoleManager = new ReactionRoleManager(client, {
            storage: true, // Enable reaction role store in a Json file
            path: __dirname + '/roles.json', // Where will save the roles if store is enabled
            mongoDbLink: process.env.MONGO_URL // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/blob/master/examples/reaction-role-manager/Note.md
        });

        reactionRoleManager.createReactionRole({
            message: msg,
            emoji: emoji,
            roles: [role],
            type: 1
        })
    } catch (err) {
        console.error(err)
        message.channel.send("**An unexpected Error Occured**");
    }
}