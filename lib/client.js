"use strict";
exports.__esModule = true;
exports.client = exports.bot_username = exports.channel = void 0;
var dotenv = require("dotenv");
var tmi = require("tmi.js");
dotenv.config();
exports.channel = process.env.channel;
exports.bot_username = process.env.bot_username;
var bot_oauth_token = process.env.bot_oauth_token;
var options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true,
        timeout: 180000,
        reconnectDecay: 1.4,
        reconnectInterval: 1000
    },
    identity: {
        username: exports.bot_username,
        password: bot_oauth_token
    },
    channels: [exports.channel]
};
exports.client = new tmi.Client(options);
