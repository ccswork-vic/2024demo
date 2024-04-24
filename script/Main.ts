import {SeleniumWorker} from "./selenium/SeleniumWorker";
import {ExpressServer} from "./express/ExpressServer";
import {ActionType} from "./vo/ActionType";
import {PlayerProxy} from "./proxy/playerProxy";
import {Login} from "./vo/Login";
import {Spin} from "./vo/Spin";
import {StartGame} from "./vo/StartGame";

class Main {
    private seleniumWorker: SeleniumWorker;
    private expressServer: ExpressServer;
    private playerProxy: PlayerProxy;

    constructor() {
        this.seleniumWorker = new SeleniumWorker();
        this.expressServer = new ExpressServer();
        // this.playerProxy = new PlayerProxy();
        //
        // // register event
        // this.seleniumWorker.registerSendLogCallback(this.expressServer.SendMessage.bind(this.expressServer));
        // this.expressServer.registerOnMessageCallback(this.onClientMessage.bind(this));
        // this.expressServer.registerOnDisconnectCallback(this.onDisconnect.bind(this));
        // //start
        // this.expressServer.startListen();
        this.seleniumWorker.login()
        this.seleniumWorker.verifyName()
        //this.seleniumWorker.quit()

    }

    private async onClientMessage(msg: string) {
        const message = JSON.parse(msg);
        console.log(message.type)
        switch (message.type) {
            case ActionType.Login:
                const login: Login = message.data;
                this.playerProxy.userId = login.userId;
                this.playerProxy.password = login.password;
               // await this.seleniumWorker.login(login.userId, login.password);
                break;
            case ActionType.StartGame:
                const startGame: StartGame = message.data
                console.log('StartGame:', message.data);
                break;

            case ActionType.Spin:
                const spin: Spin = message.data
                console.log('Spin:', message.data);
                break;
            default:
                console.log('Unknown message: ', message.type, message);
                break;
        }
    }

    private onDisconnect() {
        console.log('Client disconnected');
        this.seleniumWorker.quit();
    }
}

const main = new Main();
