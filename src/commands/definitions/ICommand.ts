import tmi = require('tmi.js');

export interface ICommand {
    name: string;
    run(channel: string, tags: tmi.ChatUserstate, message: string, commandArgs: string[]): void;
}