import tmi = require('tmi.js');
import { client, channel, bot_username } from "./client";


client.connect();
client.on('connected', (server, port) => {
    console.log("Connected to:", server + ":" + port);
    client.say(channel, "Connected!");
})

client.on('chat', (channel, tags, message, self) => {
    if (self) return;
})