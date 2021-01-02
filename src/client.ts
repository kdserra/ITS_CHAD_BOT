import * as dotenv from 'dotenv';
import tmi = require('tmi.js');

dotenv.config();

export const channels: string[] = process.env.channels.split(" ");
export const bot_username: string = process.env.bot_username;
const bot_oauth_token: string = process.env.bot_oauth_token;

const options: tmi.Options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true,
        timeout: 180000,
        reconnectDecay: 1.4,
        reconnectInterval: 1000,
    },
    identity: {
        username: bot_username,
        password: bot_oauth_token
    },
    channels: channels
}


export const client: tmi.Client = new (tmi.Client as any)(options);