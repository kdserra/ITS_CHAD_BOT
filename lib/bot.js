"use strict";
exports.__esModule = true;
var client_1 = require("./client");
var commandRegistry_1 = require("./commandRegistry");
client_1.client.connect();
client_1.client.on("connected", function (server, port) {
    console.log("Connected to:", server + ":" + port);
});
client_1.client.on("chat", function (channel, tags, message, self) {
    if (self)
        return;
    onMessageHandler(channel, tags, message, self);
});
function onMessageHandler(channel, tags, message, self) {
    if (message.charAt(0) == "!" && message.length > 1) {
        commandRegistry_1.resolveCommand(channel, tags, message);
    }
}
