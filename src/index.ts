import { config } from 'dotenv'
config()
import { Falcon } from './client/Client';
new Falcon().start({
    token: process.env.TOKEN,
    mongoURI: process.env.MONGO_URL,
    commandDir: `${__dirname}/commands`,
    prefix: ".",
    owners: ["548038495617417226"]
});
