import { log } from "console";
import { start } from "repl";
import { channels, client } from "./client";
import { LogEntry } from "./definitions/LogEntry"
import { Utils } from "./utils";
export { Log }

class Log {
    private static log: LogEntry[] = [];

    public static AddToLog(logEntry: LogEntry): void {
        this.log.push(logEntry);
        setTimeout(function () { Log.RemoveFromLog(logEntry); }, 3600000);
    }

    public static RemoveFromLog(logEntry: LogEntry): boolean {
        const index = this.log.indexOf(logEntry);
        if (index > -1) {
            this.log.splice(index, 1);
            return true;
        }
        return false;
    }

    public static FindDataInLog(channel: string, data: string): LogEntry[] {
        let matches: LogEntry[] = [];
        for (let i = 0; i < this.log.length; i++) {
            if (this.log[i].channel === channel) {
                if (this.log[i].data.toLowerCase().includes(data)) {
                    matches.push(this.log[i]);
                }
            }
        }
        return matches;
    }

    public static FindDataInLogWithinTime(channel: string, data: string, minutes: number): LogEntry[] {
        let matches: LogEntry[] = [];
        for (let i = 0; i < this.log.length; i++) {
            if (this.log[i].channel === channel) {
                let startTime: Date = Utils.GetDateFromTime(this.log[i].timeAdded);
                let endTime: Date = new Date();
                if (Utils.GetElapsedMinutes(startTime, endTime) <= minutes) {
                    if (this.log[i].data.toLowerCase().includes(data)) {
                        matches.push(this.log[i]);
                    }
                }
            }
        }
        return matches;
    }

    public static PrintLog(channel: string): void {
        Utils.PrintLineTimestamped();
        Utils.PrintTimestamped("Chat Log for: " + channel);
        Utils.PrintLineTimestamped();
        for (let i = 0; i < this.log.length; i++) {
            Utils.PrintTimestamped("Entry Number: " + i);
            Utils.PrintTimestamped("Chatroom: " + channel);
            Utils.PrintTimestamped("Username: " + this.log[i].tags.username);
            Utils.PrintTimestamped("Data: " + this.log[i].data);
            Utils.PrintTimestamped("Time Added: " + this.log[i].timeAdded);
            Utils.PrintLineTimestamped();
        }
        Utils.PrintEmpty();
        Utils.PrintLineTimestamped();
    }
}