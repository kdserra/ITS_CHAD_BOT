"use strict";
exports.__esModule = true;
exports.Utils = void 0;
var Utils = (function () {
    function Utils() {
    }
    Utils.GetCurrentTime = function () {
        return Date().slice(16, 21).toString();
    };
    return Utils;
}());
exports.Utils = Utils;
