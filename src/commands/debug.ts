import tmi = require('tmi.js');
import { channels, client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { Utils } from "../utils";
import { Log } from "../log";
import { LogEntry } from '../definitions/LogEntry';

// The debug command provides debugging features.
// Usage in chat: "!debug <debug cmd>"
export class debug implements ICommand {
    name: string = "debug";
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
        return Utils.IsStreamerOrMod(channel, tags);
    }
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        const channel_name = channel.slice(1, channel.length);
        if (this.hasPermission(channel_name, tags)) {
            if (commandArgs.length == 3) {
                switch (commandArgs[2]) {
                    case "printlog":
                        Log.PrintLog();
                        Utils.SendChatMessageToPerson(channel, Utils.GetDisplayNameFromTag(tags), "Log was printed, see output.");
                        break;
                    case "clear":
                        for (let i = 0; i < 100; i++) { Utils.PrintEmpty(); }
                        Utils.SendChatMessageToPerson(channel, Utils.GetDisplayNameFromTag(tags), "Output was cleared.");
                        break;
                    default:
                        Utils.SendChatMessageToPerson(channel, Utils.GetDisplayNameFromTag(tags), "The debug command you tried to use does not exist.");
                        break;
                }
            }
            else {
                Utils.SendChatMessageToPerson(channel, Utils.GetDisplayNameFromTag(tags), "Incorrect usage: !debug <debug cmd>.");
            }
        }
    }
}