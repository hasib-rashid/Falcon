import FalconClient from "../classes/client";

interface RunFunction {
    (client: FalconClient, ...args: any[]): Promise<any>,
};

export default interface Event {
    name: string,
    run: RunFunction,
};