import tmi = require('tmi.js');
import { client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { Utils } from "../utils";
import { Log } from "../log";
import { LogEntry } from '../definitions/LogEntry';

// The nuke command bans all users who used a specified word within a specified timeframe upto the maximum timeframe.
// Usage in chat: "!nuke <word> <minutes>"
export class nuke implements ICommand {
    name: string = "nuke";
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        if (tags.mod || channel.slice(1, channel.length) === tags.username) {
            let minutes: number = parseInt(commandArgs[3]);
            if (commandArgs.length == 4 && !isNaN(minutes) && minutes > 0) {
                if (minutes > 60) { minutes = minutes = 60; }
                const matches: LogEntry[] = Log.FindDataInLogWithinTime(commandArgs[2], minutes);
                for (let i = 0; i < matches.length; i++) {
                    if (matches[i].tags.mod === false && channel.slice(1, channel.length) !== matches[i].tags.username) {
                        client.ban(channel, matches[i].tags['display-name'], "Timed out by nuke command.");
                    }
                }
            }
        }
    }
}