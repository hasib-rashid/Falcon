import Event from "../constants/event";
const db = require("../database/index")
import consola from 'consola'
require("dotenv").config();

const ReadyEvent: Event = {
    name: "ready",
    async run(client) {
        client.logger.success("client", `[READY] Logged in as ${client.user?.tag}`);

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

        db.sequelize
            .sync()
            .then(() => consola.info("connected to db"))
            .catch(() => {
                throw "error";
            });
    },
};

export default ReadyEvent;
