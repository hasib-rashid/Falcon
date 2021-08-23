import { config } from 'dotenv'
config()
import { Falcon } from './client/Client';
import { env } from './client/env';
new Falcon().start({
    token: env.token,
    mongoURI: env.mongo_url,
    prefix: env.prefix,
    commandDir: `${__dirname}/commands`,
    owners: ["548038495617417226"]
});
