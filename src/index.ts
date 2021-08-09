import { Falcon } from './classes/client'
import { ENV } from './classes/env'

new Falcon().start({
    token: ENV.token,
    owners: ["548038495617417226"],
    prefix: ".",
    mongoURI: ""
})
