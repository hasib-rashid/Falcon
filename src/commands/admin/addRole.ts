import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';

const AddRoleCommand: Command = {
    name: 'addrole',
    description: 'Add a role for a user',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.permissions.has("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );

        const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0])
        const nameofrole = message.mentions.roles.first()?.name || args[1]

        if (message.member.permissions.has("MANAGE_ROLES")) {
            const targetUser = user;

            if (!targetUser) {
                message.channel.send(
                    "**Please specify a user first!**"
                );
                return;
            }

            const roleName = nameofrole;
            const { guild } = message;

            const role = guild?.roles.cache.find((role) => {
                return role.name === roleName;
            });

            if (!role) {
                message.channel.send(
                    `**There is no role named as "${roleName}"**`
                );
                return;
            }

            const memberUser = guild?.members.cache.get(targetUser.id);
            memberUser?.roles.add(role);

            const addRoleEmbed = new MessageEmbed()
                .setTitle("Role Added! :thumbsup:")
                .setColor("GREEN")
                .setDescription(
                    `**${role} was Successfully added to ${targetUser} by ${message.author.tag}**`
                )
                .setFooter("Copyright @2021 Falcon");

            message.channel.send({ embeds: [addRoleEmbed] });
        } else {
            message.channel.send("**Insufficient Permissions**");
        }
    },
}

export default AddRoleCommand;