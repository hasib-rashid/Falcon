"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require the needed discord.js classes
const discord_js_1 = require("discord.js");
// create a new Discord client
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES] });
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
});
client.on("messageCreate", async (message) => {
    if (message.content === "ping") {
        message.channel.send(`${client.ws.ping}`);
    }
});
// login to Discord with your app's token
client.login('Nzk5NTQzMTU0NjkyNzE4NjAy.YAFGlg.ibgrhd7558TxqQjcYAhbaURzjWI');
//# sourceMappingURL=index.js.map