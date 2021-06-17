import { Message, User } from "discord.js";

const MONEY = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;

module.exports = {
    getMember(message: Message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild?.members.cache.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild?.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if (!target) {
            (target: User) => message.author;
        }

        return target;
    },

    promptMessage: async function (message: Message, author: User, time: number, validReactions: any) {
        time *= 1000;

        for (const reaction of validReactions) await message.react(reaction);

        const filter = (reaction: any, user: User) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        return message
            .awaitReactions(filter, { max: 1, time: time })
            .then(collected => collected.first() && collected.first()?.emoji.name);
    },

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    formatDate: function (date: Date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    },

    getWrapText: function (text: string, length: number) {
        const temp = [];
        for (let i = 0; i < text.length; i += length) {
            temp.push(text.slice(i, i + length));
        }
        return temp.map(x => x.trim());
    },

    crFormat: function (number: number) {
        const ranking = Math.log10(number) / 3 | 0;
        if (!ranking) return number.toString();
        const last = MONEY[ranking];
        const scale = Math.pow(10, ranking * 3);
        const scaled = number / scale;
        return `${scaled.toFixed(2)}${last}`;
    },

    formatNumber(number: string, minimumFractionDigits = 0) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits,
            maximumFractionDigits: 2
        });
    },

    list: function (arr: any, conj = 'and') {
        const len = arr.length;
        if (len === 0) return '';
        if (len === 1) return arr[0];
        return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
    },

    firstUpperCase(text: any, split = ' ') {
        return text.split(split).map((word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    },

    shorten(text: string, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    },

    stripInvites(str: string, { guild = true, bot = true, text = '[redacted invite]' } = {}) {
        if (guild) str = str.replace(inviteRegex, text);
        if (bot) str = str.replace(botInvRegex, text);
        return str;
    },
}