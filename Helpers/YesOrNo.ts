import FalconClient from "../classes/client";

export default function YesOrNo(client: FalconClient, value: any = false) {
    return value ? client.emotes.success : client.emotes.error;
}