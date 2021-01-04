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
        const channel_name: string = channel.slice(1, channel.length);
        if (Utils.IsStreamerOrMod(channel_name, tags)) {
            let minutes: number = parseInt(commandArgs[3]);
            if (commandArgs.length == 4 && !isNaN(minutes) && minutes > 0) {
                if (minutes > 60) { minutes = minutes = 60; }
                const matches: LogEntry[] = Log.FindDataInLogWithinTime(commandArgs[2], minutes);
                for (let i = 0; i < matches.length; i++) {
                    if (!Utils.IsStreamerOrMod(channel_name, matches[i].tags)) {
                        client.ban(channel, matches[i].tags['display-name'], "Banned from the nuke command.");
                    }
                }
            }
        }
    }
}