"use strict";
exports.__esModule = true;
exports.nuke = void 0;
var utils_1 = require("../utils");
var nuke = (function () {
    function nuke() {
        this.name = "nuke";
    }
    nuke.prototype.run = function (channel, tags, message, commandArgs) {
        console.log("[" + utils_1.Utils.GetCurrentTime() + "] " + tags.username, "used command:", commandArgs[1]);
    };
    return nuke;
}());
exports.nuke = nuke;
