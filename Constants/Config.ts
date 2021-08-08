export default interface Config {
    token: string | undefined,
    ownerID: string,
    prefix?: string,
    commandDir: string,
    eventDir: string,
    emotes: {
        success: string,
        error: string,
        loading: string,
        bot: string,
        chat: string,
    }
    // eslint-disable-next-line semi
};