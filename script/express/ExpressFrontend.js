"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressFrontend = void 0;
var ExpressFrontend = /** @class */ (function () {
    function ExpressFrontend() {
    }
    ExpressFrontend.prototype.welcome = function (req, res) {
        return res.sendFile(__dirname + '/FrontEnd.html');
    };
    return ExpressFrontend;
}());
exports.ExpressFrontend = ExpressFrontend;
