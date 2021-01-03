import tmi = require("tmi.js");
import { client } from "./client";
export { Utils }

class Utils {
    /*
    const msg: string = ("@" + tags['display-name'] + " -> Output was cleared.");
    Utils.PrintTimestamped("Sent Message: " + msg);
    client.say(channel, msg);
    */

    public static SendChatMessage(channel:string, msg:string) {
        client.say(channel, msg);
        Utils.PrintTimestamped("Sent Message: " + msg);
    }

    public static SendChatMessageToPerson(channel:string, person: string, msg: string) {
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

    public static SetCharAt(str: string, index: number, chr: string) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    public static PrintTimestamped(message: string) {
        console.log("[" + Utils.GetCurrentTime() + "] " + message);
    }

    public static PrintLineTimestamped() {
        Utils.PrintTimestamped("-----------------------------");
    }
}