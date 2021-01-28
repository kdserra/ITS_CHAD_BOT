import tmi = require('tmi.js');
import { channels, client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { Utils } from "../utils";
import { TMI_Utils } from '../tmi-utils';

// The spam commands types a message in chat a designated number of times.
// Usage in chat: "!spam <number> <message>"
export class spam implements ICommand {
    name: string = "spam";
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
        return TMI_Utils.IsStreamerOrMod(channel, tags);
    }
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        let numMessagesToSend: number = parseInt(commandArgs[2]);
        let messageToSend:string = commandArgs.slice(3).join(" ");

        if (numMessagesToSend != NaN && numMessagesToSend > 0) {
            for (let i: number = 0; i < numMessagesToSend; i++) {
                TMI_Utils.SendChatMessage(channel, messageToSend);
            }
        }
        else {
            TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "Incorrect usage: !spam <number> <message>");
        }
    }
}