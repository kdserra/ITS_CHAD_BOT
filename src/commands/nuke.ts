import tmi = require('tmi.js');
import { client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { TMI_Utils } from "../tmi-utils";
import { Log } from "../log";
import { LogEntry } from '../definitions/LogEntry';

// The nuke command bans all users who used a specified word within a specified timeframe upto the maximum timeframe.
// Usage in chat: "!nuke <word> <minutes>"
export class nuke implements ICommand {
    name: string = "nuke";
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
        return TMI_Utils.IsStreamerOrMod(channel, tags);
    }
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        const channel_name: string = channel.slice(1, channel.length);
        if (this.hasPermission(channel_name, tags)) {
            let minutes: number = parseInt(commandArgs[3]);
            if (commandArgs.length == 4 && !isNaN(minutes) && minutes > 0) {
                if (minutes > 60) { minutes = minutes = 60; }
                const matches: LogEntry[] = Log.FindDataInLogWithinTime(channel, commandArgs[2], minutes);
                let numBanned:number = 0;
                for (let i = 0; i < matches.length; i++) {
                    if (!this.hasPermission(channel_name, matches[i].tags)) {
                        client.ban(channel, TMI_Utils.GetDisplayNameFromTag(matches[i].tags), "Banned from the nuke command.");
                        numBanned += 1;
                    }
                }
                TMI_Utils.SendChatMessageToPerson(channel,TMI_Utils.GetDisplayNameFromTag(tags),"Removed " + numBanned.toString() + " messages.");
            }
        }
    }
}