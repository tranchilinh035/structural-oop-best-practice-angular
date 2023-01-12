import { IpcRenderer } from 'electron';

export class PostGetRequestService {
    private ipc: IpcRenderer;

    constructor() {
        if ((<any>window).require) {
            try {
                this.ipc = (<any>window).require("electron").ipcRenderer;
            } catch (error) {
                throw error;
            }
        } else {
            console.warn("Could not load electron ipc");
        }
    }

    public sendGet(url: string, headers: object, proxy?: string) {
        let keyRender = this.makeid();
        let keyResponseSuccess = `getRequestResponseSuccess${keyRender}`;
        let keyResponseError = `getRequestResponseError${keyRender}`;
        return new Promise((resolve, reject) => {
            this.ipc.once(keyResponseSuccess, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseError);
                resolve(arg);
            });

            this.ipc.once(keyResponseError, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseSuccess);
                reject(arg);
            });

            this.ipc.send('getRequest', { url, headers, proxy, keyRender })
        })
    }

    public sendPost(url: string, dataPost: any, headers: object, proxy?: string) {
        let keyRender = this.makeid();
        let keyResponseSuccess = `postRequestResponseSuccess${keyRender}`;
        let keyResponseError = `postRequestResponseError${keyRender}`;

        return new Promise((resolve, reject) => {
            this.ipc.once(keyResponseSuccess, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseError);
                resolve(arg);
            });

            this.ipc.once(keyResponseError, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseSuccess);
                reject(arg);
            });

            this.ipc.send('postRequest', { url, params: dataPost, headers, proxy, keyRender })
        })
    }

    public uploadFile(url: string, fileInfo: any, headers: object) {
        let keyRender = this.makeid();
        let keyResponseSuccess = `uploadFileResponseSuccess${keyRender}`;
        let keyResponseError = `uploadFileResponseError${keyRender}`;

        return new Promise((resolve, reject) => {
            this.ipc.once(keyResponseSuccess, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseError);
                resolve(arg);
            });

            this.ipc.once(keyResponseError, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseSuccess);
                reject(arg);
            });

            this.ipc.send('uploadFile', { url, file: fileInfo, headers, keyRender })
        })
    }

    public downloadFile(url: string, savePath: string, headers: object) {
        let keyRender = this.makeid();
        let keyResponseSuccess = `downloadFileResponseSuccess${keyRender}`;
        let keyResponseError = `downloadFileResponseError${keyRender}`;

        return new Promise((resolve, reject) => {
            this.ipc.once(keyResponseSuccess, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseError);
                resolve(arg);
            });

            this.ipc.once(keyResponseError, (_event, arg) => {
                this.ipc.removeAllListeners(keyResponseSuccess);
                reject(arg);
            });

            this.ipc.send('downloadFile', { url, savePath: savePath, headers, keyRender })
        })
    }

    private makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
