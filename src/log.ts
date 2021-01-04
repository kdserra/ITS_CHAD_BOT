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
        Utils.PrintLineTimestamped();
        Utils.PrintTimestamped("Removed log:");
        Utils.PrintTimestamped("Username: " + logEntry.tags.username);
        Utils.PrintTimestamped("Data: " + logEntry.data);
        Utils.PrintTimestamped("Time Added: " + logEntry.timeAdded);
        Utils.PrintLineTimestamped();
        const index = this.log.indexOf(logEntry);
        if (index > -1) {
            this.log.splice(index, 1);
            return true;
        }
        return false;
    }

    public static FindDataInLog(data: string): LogEntry[] {
        let matches: LogEntry[] = [];
        for (let i = 0; i < this.log.length; i++) {
            if (this.log[i].data.toLowerCase().includes(data)) {
                matches.push(this.log[i]);
            }
        }
        return matches;
    }

    public static FindDataInLogWithinTime(data: string, minutes: number): LogEntry[] {
        let matches: LogEntry[] = [];
        for (let i = 0; i < this.log.length; i++) {

            let startTime: Date = Utils.GetDateFromTime(this.log[i].timeAdded);
            let endTime: Date = new Date();
            endTime.setMinutes(endTime.getMinutes() - minutes);

            if (Utils.GetElapsedMinutes(startTime, endTime) <= minutes) {
                if (this.log[i].data.toLowerCase().includes(data)) {
                    matches.push(this.log[i]);
                }
            }
        }
        return matches;
    }

    public static PrintLog() {
        Utils.PrintLineTimestamped();
        Utils.PrintTimestamped("Chat Log")
        Utils.PrintLineTimestamped();
        for (let i = 0; i < this.log.length; i++) {
            Utils.PrintTimestamped("Entry Number: " + i);
            Utils.PrintTimestamped("Username: " + this.log[i].tags.username);
            Utils.PrintTimestamped("Data: " + this.log[i].data);
            Utils.PrintTimestamped("Time Added: " + this.log[i].timeAdded);
            Utils.PrintLineTimestamped();
        }
        Utils.PrintEmpty();
        Utils.PrintLineTimestamped();
    }
}