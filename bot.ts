import { config } from "dotenv";
config();

import { Message, Client } from 'discord.js'

const client = new Client()

client.login(process.env.TOKEN)

client.on("ready", () => {
    console.log("[Ready] Logged in as Falcon")
})

client.on("message", (message: Message) => {
    if (message.content === "test") {
        message.channel.send("Hiya There!")
    }
})