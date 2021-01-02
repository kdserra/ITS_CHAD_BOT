import tmi = require("tmi.js");
import { ICommand } from "./commands/definitions/ICommand";
import { invalid } from "./commands/invalid";
export { registerCommand, resolveCommand, commandRegistry };

let commandRegistry: ICommand[] = [];

// Cache invalidCmd to return it when invalid commands are used.
const invalidCmd: ICommand = new invalid();

registerCommand(invalidCmd);

function getCommandArgs(message: string): string[] {
    return message.split(/[ ,]+/)[0].split(/[!,]+/);
}

function registerCommand(command: ICommand): boolean {
    if (!isValidCommand(command.name)) {
        commandRegistry.push(command);
        return true;
    }
    return false;
}

function getCommandByName(commandName: string): ICommand {
    for (let i = 0; i < commandRegistry.length; i++) {
        if (commandName == commandRegistry[i].name) {
            return commandRegistry[i];
        }
    }
    return invalidCmd;
}

function isValidCommand(commandName: string): boolean {
    for (let i = 0; i < commandRegistry.length; i++) {
        if (commandName == commandRegistry[i].name) {
            return true;
        }
    }
    return false;
}

function resolveCommand(channel: string, tags: tmi.ChatUserstate, message: string): void {
    const commandArgs: string[] = getCommandArgs(message);
    getCommandByName(commandArgs[1]).run(channel, tags, message, commandArgs);
}