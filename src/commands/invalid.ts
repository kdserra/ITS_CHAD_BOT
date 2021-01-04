import tmi = require('tmi.js');
import { client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { Utils } from "../utils";

// The invalid command is run when an invalid command is attempted.
// Usage in chat: "!invalid" or attempt to use an undefined command.
export class invalid implements ICommand {
    name: string = "invalid";
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
        return true;
    }
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        Utils.PrintTimestamped(tags.username + " tried to use invalid command: " + commandArgs[1]);
    }
}