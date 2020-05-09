"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
describe("zipcode", function () {
    it("should return true if input is a zipcode", function () {
        var input = "12550";
        var returnVal = _1.isZip(input);
        expect(returnVal).toBe(true);
    });
    it("should return false if input is not a zipcode", function () {
        var input = "12zjsunahfh433450";
        var returnVal = _1.isZip(input);
        expect(returnVal).toBe(false);
    });
});
