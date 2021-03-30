const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class AddRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "addrole",
            aliases: [],
            group: "moderation",
            memberName: "addrole",
            description: "Add a role for a person with this command",
            details: oneLine`
                Add a role for a person with this command
            `,
            examples: ["!addrole <member> <name_of_role>"],
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
            if (!message.member.hasPermission("MANAGE_ROLES"))
                return message.channel.send(
                    "**You need `MANAGE_ROLES` permission to use this command**"
                );
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
                memberUser.roles.add(role);

                const addRoleEmbed = new Discord.MessageEmbed()
                    .setTitle("Role Added! :thumbsup:")
                    .setColor("GREEN")
                    .setDescription(
                        `:thumbsup: ${role} was Successfully added to ${targetUser} by ${message.author.tag}`
                    )
                    .setFooter("Copyright @2021 CodeVert");

                message.channel.send(addRoleEmbed);
            } else {
                message.channel.send(":no_entry: Insufficient Permissions");
            }
        } catch (err) {
            console.error(err);
        }
    }
};
