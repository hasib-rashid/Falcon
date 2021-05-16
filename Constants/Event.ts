import FalconClient from "../Classes/Client";

interface RunFunction {
    // eslint-disable-next-line
    (client: FalconClient, ...args: any[]): Promise<any>,
};

export default interface Event {
    name: string,
    run: RunFunction,
    // eslint-disable-next-line semi
};