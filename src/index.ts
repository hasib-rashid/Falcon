import { config } from 'dotenv'
config()
import { Falcon } from './client/Client';
import { env } from './client/env';
new Falcon().start({
    token: env.token,
    mongoURI: process.env.MONGO_URL,
    commandDir: `${__dirname}/commands`,
    prefix: ".",
    owners: ["548038495617417226"]
});
