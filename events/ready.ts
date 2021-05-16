import Event from "../constants/event";

const ReadyEvent: Event = {
    name: "ready",
    async run(client) {
        client.logger.success("client", `[READY] Logged in as ${client.user?.tag}`);
    },
};

export default ReadyEvent;
