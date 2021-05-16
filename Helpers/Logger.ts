import moment from "moment";

const ConsoleColours = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    reset: "\u001b[0m",
};

function CurrentLogTime() {
    return moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
}

const Logger = {
    error: (name: string, output: string): void => console.log(`${ConsoleColours.red}${CurrentLogTime()} ${name}: ${ConsoleColours.reset}${output}`),
    warn: (name: string, output: string): void => console.log(`${ConsoleColours.yellow}${CurrentLogTime()} ${name}: ${ConsoleColours.reset}${output}`),
    info: (name: string, output: string): void => console.log(`${ConsoleColours.blue}${CurrentLogTime()} ${name}: ${ConsoleColours.reset}${output}`),
    success: (name: string, output: string): void => console.log(`${ConsoleColours.green}${CurrentLogTime()} ${name}: ${ConsoleColours.reset}${output}`),
};

export default Logger;
