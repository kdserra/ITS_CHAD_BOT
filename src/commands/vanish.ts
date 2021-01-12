import tmi = require('tmi.js');
import { client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { Utils } from "../utils";

// The vanish commands issues a 1 second timeout to "vanish" the user.
// Usage in chat: "!vanish"
export class vanish implements ICommand {
    name: string = "vanish";
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
        return true;
    }
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        client.timeout(channel,Utils.ConvertToStrongString(tags.username),1,"Used vanish command.");
    }
}