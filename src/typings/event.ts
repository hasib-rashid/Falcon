import { Falcon } from "../classes/client";

interface RunFunction {
    // eslint-disable-next-line
    (client: Falcon, ...args: any[]): Promise<any>,
};

export default interface Event {
    name: string,
    run: RunFunction,
};
