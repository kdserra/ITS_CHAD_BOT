import tmi = require("tmi.js");
import { client } from "./client";
export { Utils }

class Utils {
    public static IsStreamer(channel:string, tags:tmi.ChatUserstate): boolean
    {
        return channel === tags.username;
    }
    public static IsStreamerOrMod(channel:string, tags:tmi.ChatUserstate): boolean
    {
        return Utils.IsStreamer(channel,tags) || tags.mod;
    }

    public static SendChatMessage(channel: string, msg: string): void {
        client.say(channel, msg);
        Utils.PrintTimestamped("Sent Message: " + msg);
    }

    public static SendChatMessageToPerson(channel: string, person: string, msg: string): void {
        Utils.SendChatMessage(channel, "@" + person + " -> " + msg);
    }

    public static GetCurrentTime(): string {
        return Date().slice(16, 21);
    }
    public static GetDateFromTime(time: string): Date {
        let date: Date = new Date();
        let _time = time.replace(":", "");
        date.setHours(parseInt(_time.charAt(0) + _time.charAt(1)), parseInt(_time.charAt(2) + _time.charAt(3)));
        return date
    }
    public static GetElapsedMinutes(startDate: Date, endDate: Date): number {
        return Math.floor((Math.abs(startDate.getTime() - endDate.getTime()) / 1000) / 60);
    }

    public static SetCharAt(str: string, index: number, chr: string): string {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    public static PrintTimestamped(message: string): void {
        console.log("[" + Utils.GetCurrentTime() + "] " + message);
    }

    public static PrintLineTimestamped(): void {
        Utils.PrintTimestamped("-----------------------------");
    }

    public static PrintEmpty(): void {
        console.log(" ");
    }

    public static isAsciiOnly(str: string): boolean {
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) > 127)
                return false;
        return true;
    }

    public static RemoveEmojis(str: string): string {
        var regex = /[^\p{L}\p{N}\p{P}\p{Z}]/gu;
        return str.replace(regex, '');
    }
}