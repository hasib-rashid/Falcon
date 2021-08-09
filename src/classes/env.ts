import { config } from 'dotenv'
import Environment from '../typings/env'
config()

export const ENV: Environment = {
    token: process.env.TOKEN,
    mongoURL: process.env.MONGO_URL,
    google_api_key: process.env.GOOGLE_API_KEY,
    giphy_api_key: process.env.GIPHY_API_KEY,
    rapid_api_key: process.env.RAPID_API_KEY,
    db_username: process.env.DB_USERNAME,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD,
    db_hostname: process.env.DB_HOSTNAME
}
