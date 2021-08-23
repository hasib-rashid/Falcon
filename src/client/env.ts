import { config } from 'dotenv'
config()

import { ENV } from "../interfaces/Env";

export const env: ENV = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    mongo_url: process.env.MONGO_URL,
    rapid_api: process.env.RAPID_API_KEY,
    google_api: process.env.GOOGLE_API_KEY,
    giphy_api: process.env.GIPHY_API_KEY,
    db: process.env.DEFAULT_DB
}
