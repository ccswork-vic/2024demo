"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerProxy = void 0;
var PlayerProxy = /** @class */ (function () {
    function PlayerProxy() {
    }
    Object.defineProperty(PlayerProxy.prototype, "userId", {
        get: function () {
            return this.m_userId;
        },
        set: function (value) {
            this.m_userId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerProxy.prototype, "password", {
        get: function () {
            return this.m_password;
        },
        set: function (value) {
            this.m_password = value;
        },
        enumerable: false,
        configurable: true
    });
    return PlayerProxy;
}());
exports.PlayerProxy = PlayerProxy;
