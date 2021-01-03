export class LogEntry {
    username: string;
    data: string;
    timeAdded: string;
    constructor(username: string, data: string, timeAdded: string) {
        this.username = username;
        this.data = data;
        this.timeAdded = timeAdded;
    }
}