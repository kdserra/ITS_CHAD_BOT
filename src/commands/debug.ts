import tmi = require('tmi.js');
import { channels, client } from '../client';
import { ICommand } from "./definitions/ICommand";
import { TMI_Utils } from "../tmi-utils";
import { Utils } from "../utils";
import { Log } from "../log";
import { LogEntry } from '../definitions/LogEntry';
import { config } from '../config';

// The debug command provides debugging features.
// Usage in chat: "!debug <debug cmd>"
export class debug implements ICommand {
    name: string = "debug";
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean {
        return TMI_Utils.IsStreamerOrMod(channel, tags);
    }
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void {
        function banBots(i: number) {
            if (i > config.GetBotList().length) {return;}

            client.ban(channel, config.GetBotList()[i], "This user is a bot: https://twitchinsights.net/bots").catch(function () {
                console.log("Promise Rejected");
                return;
           });
            setTimeout(banBots, 1000, i+1);
            return
        }


        const channel_name = channel.slice(1, channel.length);
        if (this.hasPermission(channel_name, tags)) {
            if (commandArgs.length == 3) {
                switch (commandArgs[2]) {
                    case "printlog":
                        Log.PrintLog(channel);
                        TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "Log was printed, see output.");
                        break;
                    case "clear":
                        for (let i = 0; i < 100; i++) { Utils.PrintEmpty(); }
                        TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "Output was cleared.");
                        break;
                    case "printconfig":
                        Utils.PrintConfig();
                        TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "Config was printed, see output.");
                        break;
                    case "banbots":
                        banBots(0);
                        TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "Finished banning bots.");
                        break;
                    default:
                        TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "The debug command you tried to use does not exist.");
                        break;
                }
            }
            else {
                TMI_Utils.SendChatMessageToPerson(channel, TMI_Utils.GetDisplayNameFromTag(tags), "Incorrect usage: !debug <debug cmd>.");
            }
        }
    }
}