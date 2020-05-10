"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var utils_1 = require("./utils");
function logTimeWeather(zipLocArray) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, gatheredData, allAxiosCalls, i, zipLoc, constructedUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "http://api.weatherapi.com/v1/current.json";
                    gatheredData = [];
                    allAxiosCalls = [];
                    for (i = 0; i < zipLocArray.length; i++) {
                        zipLoc = zipLocArray[i];
                        constructedUrl = baseUrl + "?key=" + utils_1.APIKey + "&q=" + zipLoc;
                        allAxiosCalls.push(axios_1.default.get(constructedUrl));
                    }
                    return [4 /*yield*/, axios_1.default
                            .all(allAxiosCalls)
                            .then(axios_1.default.spread(function () {
                            var responses = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                responses[_i] = arguments[_i];
                            }
                            responses.forEach(function (resp) {
                                gatheredData.push({
                                    loc: resp.data.location.name,
                                    curr_weather: {
                                        temp: resp.data.current.temp_f,
                                        condition: resp.data.current.condition.text,
                                        humidity: resp.data.current.humidity,
                                        wind: resp.data.current.wind_mph,
                                    },
                                    local_time: moment_1.default(new Date(resp.data.location.localtime)).format("MM-DD-YYYY, hh:mm:ss a"),
                                });
                            });
                        }))
                            .catch(function (err) { return console.log("Error", err); })];
                case 1:
                    _a.sent();
                    logResults(gatheredData);
                    return [2 /*return*/];
            }
        });
    });
}
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
function logResults(weatherArr) {
    weatherArr.forEach(function (_a) {
        var loc = _a.loc, curr_weather = _a.curr_weather, local_time = _a.local_time;
        console.log("The current weather in " + loc + " as of " + local_time + " is: " + curr_weather.condition + ". The temperature is " + curr_weather.temp + "f. The humidity is " + curr_weather.humidity + ". The wind is " + curr_weather.wind + "mph. \n");
    });
}
logTimeWeather(["New York", "12550", "Tokyo", "Paris"]);
