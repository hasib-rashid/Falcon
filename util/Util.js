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

module.exports = class Util {
    static async verify(
        channel,
        user,
        { time = 30000, extraYes = [], extraNo = [] } = {}
    ) {
        const filter = (res) => {
            const value = res.content.toLowerCase();
            return (
                (user ? res.author.id === user.id : true) &&
                (yes.includes(value) ||
                    no.includes(value) ||
                    extraYes.includes(value) ||
                    extraNo.includes(value))
            );
        };
        const verify = await channel.awaitMessages(filter, {
            max: 1,
            time,
        });
        if (!verify.size) return 0;
        const choice = verify.first().content.toLowerCase();
        if (yes.includes(choice) || extraYes.includes(choice)) return true;
        if (no.includes(choice) || extraNo.includes(choice)) return false;
        return false;
    }

    static list(arr, conj = "and") {
        const len = arr.length;
        if (len === 0) return "";
        if (len === 1) return arr[0];
        return `${arr.slice(0, -1).join("\n")}${
            len > 1 ? `${len > 2 ? "" : ""} ${conj} ` : ""
        }${arr.slice(-1)}`;
    }

    static formatNumber(number, minimumFractionDigits = 0) {
        return Number.parseFloat(number).toLocaleString(undefined, {
            minimumFractionDigits,
            maximumFractionDigits: 2,
        });
    }

    static trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

    static shuffle(arr) {
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    static shorten(text, maxLen = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    }
};
