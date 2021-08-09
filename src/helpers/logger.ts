import { default as consola } from 'consola'

const Logger = {
    error: (name: string, output: string): void => consola.error(output),
    warn: (name: string, output: string): void => consola.warn(output),
    info: (name: string, output: string): void => consola.info(output),
    success: (name: string, output: string): void => consola.success(output),
};

export default Logger;