import { log } from "console";
import { LogEntry } from "./definitions/LogEntry"
import { Utils } from "./utils";
export { Log }

class Log {
    private static log: LogEntry[] = [];

    public static AddToLog(logEntry: LogEntry): void {
        this.log.push(logEntry);
        setInterval(function () { Log.RemoveFromLog(logEntry); }, 60000);
    }

    public static RemoveFromLog(logEntry: LogEntry): boolean {
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

    public static PrintLog() {
        if (this.log.length > 0) {
            Utils.PrintLineTimestamped();
        }
        for (let i = 0; i < this.log.length; i++) {
            Utils.PrintTimestamped("Entry Number: " + i);
            Utils.PrintTimestamped("Username: " + this.log[i].tags.username);
            Utils.PrintTimestamped("Data: " + this.log[i].data);
            Utils.PrintTimestamped("Time Added: " + this.log[i].timeAdded);
            Utils.PrintLineTimestamped();
        }
    }
}