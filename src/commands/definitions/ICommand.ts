import tmi = require('tmi.js');

export interface ICommand {
    name: string;
    hasPermission(channel: string, tags: tmi.ChatUserstate): boolean;
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void;
}