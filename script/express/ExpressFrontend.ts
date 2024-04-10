import * as express from "express";

export class ExpressFrontend {

    constructor() {
    }

    public welcome(req: express.Request, res: express.Response) {
        return res.sendFile(__dirname + '/FrontEnd.html')
    }
}