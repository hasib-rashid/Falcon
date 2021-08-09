import consola from 'consola'
import Event from '../typings/event'
require("dotenv").config();

const ReadyEvent: Event = {
    name: "ready",
    async run(client) {
        client.logger.info("client", `[READY] Logged in as ${client.user?.tag}`);

        const Activities = [
            `Serving ${client.prefix}help`,
            `In ${client.guilds.cache.size} Servers!`,
            `Serving ${client.users.cache.size} users!`,
        ]

        client.user?.setStatus("idle")
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (Activities.length - 1) + 1);
            const newActivity = Activities[randomIndex];

            client.user?.setActivity(newActivity, { type: "WATCHING" });
        }, 10000);
    },
};

export default ReadyEvent;