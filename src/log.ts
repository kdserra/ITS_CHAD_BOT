import { LogEntry } from "./definitions/LogEntry"
import { Utils } from "./utils";
export { Log }

class Log {
    private static log: LogEntry[] = [];

    public static AddToLog(logEntry: LogEntry): void {
        this.log.push(logEntry);
    }

    public static RemoveOldEntries(): void {
        for (let i = 0; i < this.log.length; i++) {
            const time: Date = Utils.GetDateFromTime(this.log[i].timeAdded);
            let maxTime: Date = Utils.GetDateFromTime(this.log[i].timeAdded);
            maxTime.setHours(time.getHours() + 1);

            if (Utils.GetElapsedMinutes(time, maxTime) >= 60) {
                Utils.PrintLineTimestamped();
                Utils.PrintTimestamped("Removed old log:");
                Utils.PrintTimestamped("Username: " + this.log[i].tags.username);
                Utils.PrintTimestamped("Data: " + this.log[i].data);
                Utils.PrintTimestamped("Time Added: " + this.log[i].timeAdded);
                Utils.PrintLineTimestamped();
                this.log.splice(i, 1);
            }
        }
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
        if (this.log.length > 0){
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