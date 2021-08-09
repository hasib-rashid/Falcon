import { Message, TextChannel } from 'discord.js'

const yes = [
    "yes",
    "y",
    "ye",
    "yeah",
    "yup",
    "yea",
    "ya",
    "hai",
    "si",
    "sí",
    "oui",
    "はい",
    "correct",
];
const no = [
    "no",
    "n",
    "nah",
    "nope",
    "nop",
    "iie",
    "いいえ",
    "non",
    "fuck off",
];

export function list(arr: any, conj = "and") {
    const len = arr.length;
    if (len === 0) return "";
    if (len === 1) return arr[0];
    return `1. ${arr.slice(0, -1).join("\n ")}2.${len > 1 ? `3. ${len > 2 ? "" : ""} 4.${conj} ` : ""
        }${arr.slice(-1)}`;
}

export function formatNumber(number: string, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2,
    });
}

export function trimArray(arr: any, maxLen = 10) {
    if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
    }
    return arr;
}

export function shuffle(arr: any) {
    for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

export function shorten(text: string, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}

export function googleShorten(text: string, maxLen = 80) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}

export function getArraySum(a: any) {
    var total = 0;
    for (var i in a) {
        total += a[i];
    }
    return total;
}