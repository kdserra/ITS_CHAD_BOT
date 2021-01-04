import tmi = require("tmi.js");
import { client } from "./client";
import { Utils } from "./utils";
export { TMI_Utils }

class TMI_Utils {
    public static IsMod(tags: tmi.ChatUserstate): boolean {
        if (tags.mod === undefined || tags.mod === false) { return false; }
        else { return true; }
    }

    public static IsStreamer(channel: string, tags: tmi.ChatUserstate): boolean {
        return channel === tags.username;
    }
    public static IsStreamerOrMod(channel: string, tags: tmi.ChatUserstate): boolean {
        return TMI_Utils.IsStreamer(channel, tags) || TMI_Utils.IsMod(tags);
    }

    public static GetDisplayNameFromTag(tags: tmi.ChatUserstate): string {
        if (tags["display-name"] === undefined) { return ""; }
        else { return tags["display-name"]; }
    }

    public static SendChatMessage(channel: string, msg: string): void {
        client.say(channel, msg);
        Utils.PrintTimestamped("Sent Message: " + msg);
    }

    public static SendChatMessageToPerson(channel: string, person: string, msg: string): void {
        TMI_Utils.SendChatMessage(channel, "@" + person + " -> " + msg);
    }
}