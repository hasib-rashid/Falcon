import consola from 'consola';
import {
    Message,
    GuildMember,
    EmbedFieldData,
    GuildChannel,
    User,
    MessageReaction,
    TextChannel,
    MessageEmbedOptions,
} from 'discord.js';
import { URL } from 'url';
import Falcon from '../base/Client';
import { Anything } from '../interfaces/Anything';
class UtilsManager {
    private client: Falcon;
    public constructor(client: Falcon) {
        this.client = client;
        consola.info('Utils has been constructed');
    }
    public formatMS(ms: number, noDetails?: boolean): string {
        const times: object = {
            week: Math.floor(ms / (1000 * 60 * 60 * 24 * 7)),
            day: Math.floor((ms / (1000 * 60 * 60 * 24)) % 7),
            hour: Math.floor((ms / (1000 * 60 * 60)) % 24),
            minute: Math.floor((ms / (1000 * 60)) % 60),
            second: Math.floor((ms / 1000) % 60),
        };

        let string = '';

        for (const [key, value] of noDetails === true
            ? Object.entries(times).filter(
                (value: [string, any]) =>
                    value[0] != 'hour' && value[0] != 'minute' && value[0] != 'second'
            )
            : Object.entries(times)) {
            if (value > 0) string += ` ${value} ${key}${value > 1 ? 's, ' : ','}`;
        }
        return string
            .trim()
            .substring(0, string.trim().length - 1)
            .replace(/  /gi, ' ');
    }
    public constructField(
        name: string,
        value: string,
        inline?: boolean
    ): EmbedFieldData {
        return { name, value, inline };
    }
    public formatNumber(number: string, minimumFractionDigits = 0) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits,
            maximumFractionDigits: 2,
        });
    }
    public googleShorten(text: string, maxLen = 80) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    }
    public trimArray(arr: any, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }
    public getArraySum(a: any) {
        var total = 0;
        for (var i in a) {
            total += a[i];
        }
        return total;
    }
    public formatDate(date: Date, str: string): string {
        return str
            .replace(
                /DD/gi,
                date.getDay().toString() == '0' ? '1' : date.getDay().toString()
            )
            .replace(/MM/gi, date.getMonth().toString())
            .replace(/YYYY/gi, date.getFullYear().toString());
    }
    public randomElement(arr: any[]): any {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    public async tryItAndSee<T>(code: Function): Promise<T | boolean> {
        try {
            const response: T = await code();
            return response;
        } catch {
            return false;
        }
    }
    public checkURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}
export { UtilsManager };