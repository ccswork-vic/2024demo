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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeleniumWorker = void 0;
var SeleniumAdminInstance_1 = require("./SeleniumAdminInstance");
var SeleniumMaInstance_1 = require("./SeleniumMaInstance");
var SeleniumAgInstance_1 = require("./SeleniumAgInstance");
var SeleniumWorker = /** @class */ (function () {
    function SeleniumWorker() {
        this.SeleniumAdminInstance = new SeleniumAdminInstance_1.SeleniumAdminInstance();
        this.SeleniumMaInstance = new SeleniumMaInstance_1.SeleniumMaInstance();
        this.SeleniumAgInstance = new SeleniumAgInstance_1.SeleniumAgInstance();
    }
    SeleniumWorker.prototype.registerSendLogCallback = function (handler) {
        this.logCallback = handler;
    };
    SeleniumWorker.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SeleniumAdminInstance.buildDriver()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SeleniumAdminInstance.getJdb()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.SeleniumAdminInstance.login()];
                    case 3:
                        _a.sent();
                        this.log("Admin Login Success!");
                        return [4 /*yield*/, this.SeleniumMaInstance.buildDriver()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.SeleniumMaInstance.getJdb()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.SeleniumMaInstance.login()];
                    case 6:
                        _a.sent();
                        this.log("MA Login Success!");
                        return [4 /*yield*/, this.SeleniumAgInstance.buildDriver()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.SeleniumAgInstance.getJdb()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.SeleniumAgInstance.login()];
                    case 9:
                        _a.sent();
                        this.log("AG Login Success!");
                        return [2 /*return*/];
                }
            });
        });
    };
    // async verifyAdminSettings() {
    //     await this.SeleniumAdminInstance.verifyAdminSettings();
    // }
    //
    // async verifyGameSettings() {
    //     await this.SeleniumMaInstance.verifyGameSettings();
    // }
    //
    SeleniumWorker.prototype.verifyName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('執行 verifyName 方法');
                        return [4 /*yield*/, this.SeleniumAdminInstance.verifyName()];
                    case 1:
                        _a.sent();
                        this.log("走入執行驗證名稱");
                        return [2 /*return*/];
                }
            });
        });
    };
    // async login() {
    //     const instances = [this.SeleniumAdminInstance, this.SeleniumMaInstance, this.SeleniumAgInstance];
    //     const instanceNames = ['Admin', 'MA11', 'AG'];
    //
    //     for (let i = 0; i < instances.length; i++) {
    //         const instance = instances[i];
    //         await instance.buildDriver();
    //         await instance.getJdb();
    //         await instance.login();
    //         this.log(`${instanceNames[i]} Login Success!`);
    //     }
    // }
    SeleniumWorker.prototype.quit = function () {
        this.SeleniumAdminInstance.quit();
        this.SeleniumMaInstance.quit();
        this.SeleniumAgInstance.quit();
    };
    SeleniumWorker.prototype.log = function (log) {
        console.log(log);
        this.logCallback && this.logCallback(log);
    };
    return SeleniumWorker;
}());
exports.SeleniumWorker = SeleniumWorker;
