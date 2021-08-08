import { Falcon } from "../classes/client";

export interface RunFunction {
    // eslint-disable-next-line
    (client: Falcon, ...args: any[]): Promise<any>,
};

export interface Event {
    name: string,
    run: RunFunction,
};
