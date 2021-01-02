import tmi = require('tmi.js');
import { client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { Utils } from "../utils";

// The nuke command bans all users who used a specified word within a specified timeframe.
// Maximum timeframe: 60 minutes.
// Usage in chat: "!nuke <word> <minutes>"
export class nuke implements ICommand {
    name: string = "nuke";
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        // check if user has permission to use command (AKA: moderator)
        console.log("[" + Utils.GetCurrentTime() + "] " + tags.username, "used command:", commandArgs[1]);

        if (commandArgs.length == 4) {
            // [!, "nuke", "john", "40"]
        }
    }
}