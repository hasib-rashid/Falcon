import FalconClient from "../classes/client";

interface RunFunction {
    // eslint-disable-next-line
    (client: FalconClient, ...args: any[]): Promise<any>,
};

export default interface Event {
    name: string,
    run: RunFunction,
    // eslint-disable-next-line semi
};