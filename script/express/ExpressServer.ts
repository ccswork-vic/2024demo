import * as express from "express";
import {WebSocket, Server} from 'ws';
import {ExpressFrontend} from "./ExpressFrontend";

export class ExpressServer {
    private onMessageCallback: Function;
    private onDisconnectCallback: Function;

    private app: any;
    private PORT = process.env.PORT || 8080;
    private expressServer: any;
    private wss: any;
    private frontend: ExpressFrontend;

    constructor() {
        this.frontend = new ExpressFrontend();
        this.app = express();
        this.app.get("/", this.frontend.welcome);

        this.expressServer = this.app.listen(this.PORT, () => {
            console.log(`Server listening on port ${this.PORT}`);
        });
        this.wss = new WebSocket.Server({server: this.expressServer});
    }

    registerOnMessageCallback(handler: Function) {
        this.onMessageCallback = handler;
    }

    registerOnDisconnectCallback(handler: Function) {
        this.onDisconnectCallback = handler;
    }

    startListen() {
        this.wss.on('connection', (ws) => {
            console.log('Client connected');
            ws.on('message', this.onMessage.bind(this));
            ws.on('close', this.onDisconnect.bind(this));
            ws.send('connected!!');
        });
    }


    SendMessage(message: string) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    private onMessage(message: Buffer) {
        console.log('received: %s', message);
        this.onMessageCallback && this.onMessageCallback(message.toString());
    }

    private onDisconnect() {
        console.log('Client disconnected');
        this.onDisconnectCallback && this.onDisconnectCallback();
    }

}
