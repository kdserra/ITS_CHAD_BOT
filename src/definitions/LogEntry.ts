import tmi = require('tmi.js');
import { channels } from '../client';

export class LogEntry {
    channel: string;
    tags: tmi.ChatUserstate;
    data: string;
    timeAdded: string;
    constructor(channel: string, tags: tmi.ChatUserstate, data: string, timeAdded: string) {
        this.channel = channel;
        this.tags = tags;
        this.data = data;
        this.timeAdded = timeAdded;
    }
}