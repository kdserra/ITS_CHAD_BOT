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
        if (tags.mod) {
            Utils.PrintTimestamped(tags.username + " used command: " + commandArgs[1]);
            let minutes: number = parseInt(commandArgs[3]);
            if (commandArgs.length == 4 && !isNaN(minutes)) {
                if (minutes > 60) { minutes = 60; }

                const matches: LogEntry[] = Log.FindDataInLog(commandArgs[2]);
                for (let i = 0; i < matches.length; i++) {
                    if (matches[i].tags.username != tags.username) {
                        Utils.PrintTimestamped(matches[i].tags.username + " said this!");
                        client.say(channel, matches[i].tags['display-name'] + " said this!");
                    }
                }
            }
        }
    }
}