export interface Config {
	token: string;
	mongoURI: string;
	prefix: string;
	owners: Array<string>;
	commandDir: string;
	webAuth?: string;
	webPort?: number;
	topGGToken?: string;
	onlyUsed?: string[];
}
