const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class RemoveRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "removerole",
            aliases: [],
            group: "moderation",
            memberName: "removerole",
            description: "Remove a role from a user with a command only!",
            details: oneLine`
                Remove a role from a user with a command only!
            `,
            clientPermissions: ["MANAGE_ROLES"],
            examples: ["!removerole <member> <role>"],
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt:
                        "Please specify the user you want to add the role to",
                },
                {
                    key: "nameofrole",
                    type: "string",
                    prompt: "Please specify the role you want to give!",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { nameofrole, user }) {
        try {
            if (message.member.hasPermission("MANAGE_ROLES")) {
                const targetUser = user;

                if (!targetUser) {
                    message.channel.send(
                        ":no_entry: Please specify a user first!"
                    );
                    return;
                }

                const roleName = nameofrole;
                const { guild } = message;

                const role = guild.roles.cache.find((role) => {
                    return role.name === roleName;
                });

                if (!role) {
                    message.channel.send(
                        `:no_entry: There is no role named as "${roleName}"`
                    );
                    return;
                }

                const memberUser = guild.members.cache.get(targetUser.id);
                memberUser.roles.remove(role);

                const removeRoleEmbed = new Discord.MessageEmbed()
                    .setTitle("Role Removed! :thumbsup:")
                    .setColor("RED")
                    .setDescription(
                        `:thumbsup: ${role} was Successfully removed to ${targetUser} by ${message.author.tag}`
                    )
                    .setFooter("Copyright @2021 CodeVert");

                message.channel.send(removeRoleEmbed);
            } else {
                message.channel.send(":no_entry: Insufficient Permissions");
            }
        } catch (err) {
            console.error(err);
        }
    }
};
