import {SeleniumAdminInstance} from "./SeleniumAdminInstance";
import {SeleniumMaInstance} from "./SeleniumMaInstance";
import {SeleniumAgInstance} from "./SeleniumAgInstance";

export class SeleniumWorker {
    private logCallback: Function;

    private SeleniumAdminInstance: SeleniumAdminInstance;
    private SeleniumMaInstance: SeleniumMaInstance;
    private SeleniumAgInstance: SeleniumAgInstance;


    constructor() {
        this.SeleniumAdminInstance = new SeleniumAdminInstance();
        this.SeleniumMaInstance = new SeleniumMaInstance();
        this.SeleniumAgInstance = new SeleniumAgInstance();
    }

    registerSendLogCallback(handler: Function) {
        this.logCallback = handler;
    }

    async login() {
        await this.SeleniumAdminInstance.buildDriver();
        await this.SeleniumAdminInstance.getJdb();
        await this.SeleniumAdminInstance.login();
        this.log("Admin Login Success!");

        await this.SeleniumMaInstance.buildDriver();
        await this.SeleniumMaInstance.getJdb();
        await this.SeleniumMaInstance.login();
        this.log("MA Login Success!");

        await this.SeleniumAgInstance.buildDriver();
        await this.SeleniumAgInstance.getJdb();
        await this.SeleniumAgInstance.login();
        this.log("AG Login Success!");
    }

    // async verifyAdminSettings() {
    //     await this.SeleniumAdminInstance.verifyAdminSettings();
    // }
    //
    // async verifyGameSettings() {
    //     await this.SeleniumMaInstance.verifyGameSettings();
    // }
    //
    async verifyName() {
        console.log('執行 verifyName 方法');
        await this.SeleniumAdminInstance.verifyName();
        this.log("走入執行驗證名稱");
        // await this.SeleniumMaInstance.verifyName();
        // await this.SeleniumAgInstance.verifyName();
    }

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


    quit() {
        this.SeleniumAdminInstance.quit();
        this.SeleniumMaInstance.quit();
        this.SeleniumAgInstance.quit();
    }

    log(log: string) {
        console.log(log);
        this.logCallback && this.logCallback(log);
    }
}
