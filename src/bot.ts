import tmi = require("tmi.js");
import { channels, client } from "./client";
import { resolveCommand } from "./commandRegistry";
import { TMI_Utils } from "./tmi-utils";
import { Utils } from "./utils";
import { Log } from "./log";
import { LogEntry } from "./definitions/LogEntry";
import { config } from "./config";

client.connect();
client.on("connected", (server, port) => {
    Utils.PrintTimestamped("Connected to:" + server + ":" + port);
})

client.on("chat", (channel, tags, message, self) => {
    if (self) return;
    onMessageHandler(channel, tags, message, self);
})

function onMessageHandler(channel: string, tags: tmi.ChatUserstate, message: string, self: boolean): void {
    if (message.charAt(0) == "!" && message.length > 1) {
        resolveCommand(channel, tags, message);
    }
    
    if (!TMI_Utils.IsStreamerOrMod(channel,tags)) {
        if (!Utils.isAsciiOnly(Utils.RemoveSpecials(message)) && config.GetConfigOptions().using_symbol_filter)
        {
            const msg: string = "Please only use ASCII characters!";
            client.timeout(channel, Utils.ConvertToStrongString(tags.username), 5, msg);
            TMI_Utils.SendChatMessageToPerson(channel, Utils.ConvertToStrongString(tags.username), msg);
        }
        if (Utils.ContainsBlacklistedPhrase(message)){
            client.ban(channel, Utils.ConvertToStrongString(tags.username), "Banned for blacklisted spam.");
        }
    }


    let logEntry = new LogEntry(channel, tags, message, Utils.GetCurrentTime());
    Log.AddToLog(logEntry);
}