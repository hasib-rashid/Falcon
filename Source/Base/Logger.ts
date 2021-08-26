import { blue, green, red, yellow } from "ansi-colors";
import { stripIndents } from "common-tags";

export default class Logger {
	// private _colors = {
	// 	red: "\033[31;1m",
	// 	blue: "\033[34;1m",
	// 	yellow: "\033[33;1m",
	// 	green: "\033[32;1m",
	// 	reset: "\033[0m",
	// };

	private __getTimestamp() {
		return new Date().toUTCString();
	}

	public success(context: string, message: string) {
		// console.log(`${this._colors.green}${this.__getTimestamp()} ${context} - ${this._colors.reset}${message}`);
		console.log(green(`${this.__getTimestamp()} ${context} - `) + message);
	}

	public warn(context: string, message: string) {
		// console.log(`${this._colors.yellow}${this.__getTimestamp()} ${context} - ${this._colors.reset}${message}`);
		console.log(yellow(`${this.__getTimestamp()} ${context} - `) + message);
	}

	public error(context: string, message: string, stack?: string) {
		// console.log(stripIndents`${this._colors.red}${this.__getTimestamp()} ${context} -
		// Message: ${this._colors.reset}${message}
		// ${this._colors.red}Stack: ${this._colors.reset}${stack || "Not provided"}
		// `);
		console.log(
			stripIndents`
				${red(`${this.__getTimestamp()} ${context} - `)}
				${red("Message: ")} ${message}
				${red("Stack: ")} ${stack || "Not provided"}
			`,
		);
	}
	public info(context: string, message: string) {
		// console.log(`${this._colors.blue}${this.__getTimestamp()} ${context} - ${this._colors.reset}${message}`);
		console.log(blue(`${this.__getTimestamp()} ${context} - `) + message);
	}
};