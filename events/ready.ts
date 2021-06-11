import Event from "../constants/event";
const db = require("../database/index")
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

        db.authenticate().then(() => {
            console.log("Connected to Database.")

            GuildUser.init(db)
            GuildUser.sync()
        }).catch(err => {
            console.error(err)
        })
    },
};

export default ReadyEvent;
