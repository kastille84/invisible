"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logTimeWeather(zipLocArray) {
}
exports.logTimeWeather = logTimeWeather;
function isZip(inputStr) {
    if (inputStr.length > 5) {
        return false;
    }
    var isZip = inputStr
        .split("")
        .every(function (str) {
        return !isNaN(parseInt(str));
    });
    return isZip;
}
exports.isZip = isZip;
