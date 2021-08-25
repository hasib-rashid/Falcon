import { RunFunction } from '../../interfaces/Command';
import hangman from 'discord-hangman'

export const name = 'hangman'
export const category = 'games'
export const description = 'Play Hangman in Discord'

export const run: RunFunction = async (client, message, args) => {
    // @ts-ignore
    await hangman.create(message.channel, 'random')
}