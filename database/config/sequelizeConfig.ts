import dotenv from 'dotenv'
dotenv.config()

export const config = {
    "database": process.env.DB_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "hostname": process.env.DB_HOSTNAME
}