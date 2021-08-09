import { Falcon } from '../classes/client';
import { EventEmitter } from 'events';
export interface RunFunction {
    (client: Falcon, ...params: unknown[]): Promise<unknown>;
}

export interface FunctionForEE {
    (client: Falcon): EventEmitter;
}

export interface Event {
    name: string;
    run: RunFunction;
    emitter?: EventEmitter | FunctionForEE;
}