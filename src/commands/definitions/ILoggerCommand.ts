import tmi = require('tmi.js');
import { ICommand } from "./ICommand";

export interface ILoggerCommand extends ICommand {
    log: { [word: string]: LogEntry[]; };
}