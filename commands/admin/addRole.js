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
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (message.member.hasPermission("MANAGE_ROLES")) {
            const targetUser = message.mentions.users.first();
            const args = message.content.slice().split(" ");

            if (!targetUser) {
                message.channel.send(":no_entry: Please specify a user first!");
                return;
            }

            args.shift();

            const roleName = args.join(" ");
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
                .setColor("RANDOM")
                .setDescription(
                    `:thumbsup: ${role} was Successfully added to ${targetUser} by ${message.author.tag}`
                )
                .setFooter("Copyright @2021 CodeVert");

            message.channel.send(addRoleEmbed);
        } else {
            message.channel.send(":no_entry: Insufficient Permissions");
        }
    }
};
