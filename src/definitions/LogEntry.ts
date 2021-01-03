import tmi = require('tmi.js');

export class LogEntry {
    tags: tmi.ChatUserstate;
    data: string;
    timeAdded: string;
    constructor(tags: tmi.ChatUserstate, data: string, timeAdded: string) {
        this.tags = tags;
        this.data = data;
        this.timeAdded = timeAdded;
    }
}