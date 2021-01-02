import tmi = require("tmi.js");
import { client } from "./client";
import { resolveCommand } from "./commandRegistry";

client.connect();
client.on("connected", (server, port) => {
    console.log("Connected to:", server + ":" + port);
})

client.on("chat", (channel, tags, message, self) => {
    if (self) return;
    onMessageHandler(channel, tags, message, self);
})

function onMessageHandler(channel: string, tags: tmi.ChatUserstate, message: string, self: boolean) {
    if (message.charAt(0) == "!" && message.length > 1) {
        resolveCommand(channel, tags, message)
    }
}