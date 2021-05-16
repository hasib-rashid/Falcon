import { config } from "dotenv";
config();
import Client from "./Classes/Client";

new Client({
    token: process.env.TOKEN,
    ownerID: "839367177899737108",
    commandDir: `${__dirname}/Commands`,
    eventDir: `${__dirname}/Events`,
    prefix: "*",
    emotes: {
        success: "<a:checkmark:840147155112165406>",
        error: "<a:error:840147176360378388>",
        loading: "<a:loading:840147214193917963>",
        bot: "<:bot:841733069458899015>",
        chat: "<:chat:841735309258653708>",
    },
});