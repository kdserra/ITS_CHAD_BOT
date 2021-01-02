import tmi = require('tmi.js');
import { ICommand } from "./ICommand";
import { LogEntry } from "./LogEntry";

export interface ILoggerCommand extends ICommand {
    log: { [word: string]: LogEntry[]; };
}