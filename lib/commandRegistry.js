"use strict";
exports.__esModule = true;
exports.commandRegistry = exports.resolveCommand = exports.registerCommand = void 0;
var invalid_1 = require("./commands/invalid");
var invalidCmd = new invalid_1.invalid();
var commandRegistry = [];
exports.commandRegistry = commandRegistry;
registerCommand(new invalid_1.invalid());
function getCommandArgs(message) {
    return message.split(/[ ,]+/)[0].split(/[!,]+/);
}
function registerCommand(command) {
    if (!isValidCommand(command.name)) {
        commandRegistry.push(command);
        return true;
    }
    return false;
}
exports.registerCommand = registerCommand;
function getCommandByName(commandName) {
    for (var i = 0; i < commandRegistry.length; i++) {
        if (commandName == commandRegistry[i].name) {
            return commandRegistry[i];
        }
    }
    return invalidCmd;
}
function isValidCommand(commandName) {
    for (var i = 0; i < commandRegistry.length; i++) {
        if (commandName == commandRegistry[i].name) {
            return true;
        }
    }
    return false;
}
function resolveCommand(channel, tags, message) {
    var commandArgs = getCommandArgs(message);
    getCommandByName(commandArgs[1]).run(channel, tags, message, commandArgs);
}
exports.resolveCommand = resolveCommand;
