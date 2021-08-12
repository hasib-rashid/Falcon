import consola from 'consola'
import Event from '../typings/event'
import Nuggies from 'nuggies'
require("dotenv").config();
import express from 'express'
import ms from 'ms'
import { Deta } from 'deta'
import { ENV } from '../classes/env';
const deta = Deta(ENV.db)
const db = deta.Base("muted")

const app = express()
const port = 8080

const ReadyEvent: Event = {
    name: "ready",
    async run(client) {
        client.logger.info("client", `[READY] Logged in as ${client.user?.tag}`);

        app.get("/", (req, res) => {
            res.send("Falcon Is Online")
        })
        
        app.listen(port, () => console.log(`App listening on port ${port}`))

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

        Nuggies.giveaways.startAgain(client);

        client.guilds.cache.map((ev) => {
            ev.members.cache.map((member) => {
                // @ts-ignore
                if (member.roles.cache.has(ev?.roles.cache.find(r => r.name.toLowerCase() === 'muted')?.id)) {
                    db.fetch({ userID: member.id, guildID: member.guild.id }).then((response) => {
                        setInterval(async () => {
                            // @ts-ignore
                            await member.roles.remove(member.guild.roles.cache.find((role) => role.name.toLowerCase() === "muted"))

                            db.delete(response.items[0].key as any)
                        }, ms(response.items[0].time))
                    })
                }
            })
        })
    },
};

export default ReadyEvent;