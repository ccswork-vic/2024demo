"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
var express = require("express");
var ws_1 = require("ws");
var ExpressFrontend_1 = require("./ExpressFrontend");
var ExpressServer = /** @class */ (function () {
    function ExpressServer() {
        var _this = this;
        this.PORT = process.env.PORT || 8080;
        this.frontend = new ExpressFrontend_1.ExpressFrontend();
        this.app = express();
        this.app.get("/", this.frontend.welcome);
        this.expressServer = this.app.listen(this.PORT, function () {
            console.log("Server listening on port ".concat(_this.PORT));
        });
        this.wss = new ws_1.WebSocket.Server({ server: this.expressServer });
    }
    ExpressServer.prototype.registerOnMessageCallback = function (handler) {
        this.onMessageCallback = handler;
    };
    ExpressServer.prototype.registerOnDisconnectCallback = function (handler) {
        this.onDisconnectCallback = handler;
    };
    ExpressServer.prototype.startListen = function () {
        var _this = this;
        this.wss.on('connection', function (ws) {
            console.log('Client connected');
            ws.on('message', _this.onMessage.bind(_this));
            ws.on('close', _this.onDisconnect.bind(_this));
            ws.send('connected!!');
        });
    };
    ExpressServer.prototype.SendMessage = function (message) {
        this.wss.clients.forEach(function (client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message);
            }
        });
    };
    ExpressServer.prototype.onMessage = function (message) {
        console.log('received: %s', message);
        this.onMessageCallback && this.onMessageCallback(message.toString());
    };
    ExpressServer.prototype.onDisconnect = function () {
        console.log('Client disconnected');
        this.onDisconnectCallback && this.onDisconnectCallback();
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
