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

            if (Utils.GetElapsedMinutes(time, maxTime) > 60) {
                console.log("[" + Utils.GetCurrentTime() + "] " + " removing old log: \nUsername:" + this.log[i].username + "\nData:" + this.log[i].data + "\nTime Added:" + this.log[i].timeAdded);
                this.log.splice(i, 1);
            }
        }
    }

    public static FindDataInLog(data: string): LogEntry[] {
        let matches: LogEntry[] = [];
        for (let i = 0; i < this.log.length; i++) {
            if (this.log[i].data.includes(data)) {
                matches.push(this.log[i]);
            }
        }
        return matches;
    }

    public static PrintLog() {
        console.log("---------------------------");
        for (let i = 0; i < this.log.length; i++) {
            console.log("[" + Utils.GetCurrentTime() + "] Entry Number: " + i);
            console.log("[" + Utils.GetCurrentTime() + "] Username: " + this.log[i].username);
            console.log("[" + Utils.GetCurrentTime() + "] Data: " + this.log[i].data);
            console.log("[" + Utils.GetCurrentTime() + "] Time Added: " + this.log[i].timeAdded);
            console.log("---------------------------");
        }
    }
}