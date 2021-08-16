import { RunFunction } from '../../interfaces/Command'; 

export const name = 'uptime'
export const category = 'misc'
export const description = 'Check the Uptime of Falcon'

export const run: RunFunction = async (client, message, args) => {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds / 60;
    message.channel.send(
        `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
    );
}