import { config } from 'dotenv'
config()

import { Falcon } from './classes/client'

new Falcon().start({
    token: process.env.TOKEN,
    owners: ["548038495617417226"],
    prefix: ".",
    mongoURI: ""
})
