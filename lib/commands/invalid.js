"use strict";
exports.__esModule = true;
exports.invalid = void 0;
var utils_1 = require("../utils");
var invalid = (function () {
    function invalid() {
        this.name = "invalid";
    }
    invalid.prototype.run = function (channel, tags, message, commandArgs) {
        console.log("[" + utils_1.Utils.GetCurrentTime() + "] " + tags.username, "tried to use invalid command:", commandArgs[1]);
    };
    return invalid;
}());
exports.invalid = invalid;
