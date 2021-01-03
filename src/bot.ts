import tmi = require("tmi.js");
import { client } from "./client";
import { resolveCommand } from "./commandRegistry";
import { Utils } from "./utils";
import { Log } from "./log";
import { LogEntry } from "./definitions/LogEntry";

client.connect();
client.on("connected", (server, port) => {
    Utils.PrintTimestamped("Connected to:" + server + ":" + port);
})

client.on("chat", (channel, tags, message, self) => {
    if (self) return;
    onMessageHandler(channel, tags, message, self);
})

function onMessageHandler(channel: string, tags: tmi.ChatUserstate, message: string, self: boolean) {
    if (message.charAt(0) == "!" && message.length > 1) {
        resolveCommand(channel, tags, message);
    }

    let logEntry = new LogEntry(tags, message, Utils.GetCurrentTime());
    Log.AddToLog(logEntry);
    Utils.PrintTimestamped("Added log entry.");
}

setInterval(function(){ Log.RemoveOldEntries(); }, 60000);