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
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        if (tags.mod) {
            if (commandArgs.length == 2)
            {
                switch (commandArgs[1]){
                    case "printlog":
                        Log.PrintLog();
                        break;
                    default:
                        const msg:string = ("@" + tags['display-name'] + " -> The debug command you tried to use does not exist.");
                        Utils.PrintTimestamped("Sent Message:" + msg);
                        client.say(channel, msg);
                        break;
                }
            }
        }
    }
}