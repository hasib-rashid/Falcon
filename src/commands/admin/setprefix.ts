import { config } from 'dotenv'
config()

import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Deta } from 'deta'

const deta = Deta(process.env.DEFAULT_DB)
const db = deta.Base("guild")

export const name = 'setprefix'
export const category = 'admin'
export const description = 'Set the prefix of a server'
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"
export const aliases = ["prefix"]

export const run: RunFunction = async (client, message, args) => {

}