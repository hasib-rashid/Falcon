import { config } from 'dotenv'
config()
import { Spencer } from './client/Client';
new Spencer().start({
    token: process.env.TOKEN,
    mongoURI: process.env.MONGO_URL,
    prefix: ".",
    owners: ["548038495617417226"]
});
