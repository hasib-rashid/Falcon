import Event from "../constants/event";
import consola from 'consola'
import { Sync } from '../database/sync'
require("dotenv").config();

const ReadyEvent: Event = {
    name: "ready",
    async run(client) {
        try {
            Sync()
            consola.info("Connected to Database")
        } catch (err) {
            consola.error("Error Connecting to the database. Log the error to find it out")
        }

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
