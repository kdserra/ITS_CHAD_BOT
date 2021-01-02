"use strict";
exports.__esModule = true;
var client_1 = require("./client");
client_1.client.connect();
client_1.client.on('connected', function (server, port) {
    console.log("Connected to:", server + ":" + port);
    client_1.client.say(client_1.channel, "Connected!");
});
client_1.client.on('chat', function (channel, tags, message, self) {
    if (self)
        return;
});
