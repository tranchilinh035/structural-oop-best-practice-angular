import { TranslateService } from "@ngx-translate/core";
// import {Profile} from "../../model/Profile";

export class Utils {
    public static app = (<any>window).require('electron').remote.app;
    public static userAppDataPath = Utils.app.getPath('userData');
    // public static listProfileRunning: Array<Profile> = new Array<Profile>();
    public static translate: TranslateService;
    // method
    public static regexEmail(s: string): boolean {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(s);
    }

    public static onlyContainsNumber(s: string): boolean {
        return !/\D/.test(s);
    }

    public static generalListNumber(startNumber: number, endNumber: number) {
        let list = [];
        for (let i = startNumber; i < endNumber; i++) {
            list.push(i);
        }
        return list;
    }

    public static makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static getError(e) {
        let error = '';
        if (e.message) {
            error += e.message + '\n';
        }
        if (e.stack) {
            error += e.stack + '\n';
        }
        try {
            error += JSON.stringify(e) + '\n';
        } catch (e) {
            error += e.toString();
        }

        return `${this.translate.instant("an_error_occurred")}: ${error}`;
    }

    public static checkHDH() {
        var opsys: any = process.platform;
        let hdh = '';
        if (opsys === 'darwin') {
            hdh = 'macos';
        } else if (opsys === 'win32' || opsys == 'win64') {
            hdh = opsys;
        } else if (opsys === 'linux') {
            hdh = opsys;
        }
        return hdh;
    }

    public static makeNumber(length) {
        let result = '';
        let characters = '0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static makeNumberNot0(length) {
        let result = '';
        let characters = '123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static randomArrray(array) {
        let random = Math.floor(Math.random() * array.length);
        return array[random];
    }

    public static shuffleArr(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]]
        }
        return array;
    }

    public static generateLocation(latitude, longitude, max, min = 0) {
        const EARTH_RADIUS = 6371; // km
        const DEGREE = EARTH_RADIUS * 2 * Math.PI / 360 * 1000; // 1° latitude in meters

        const r = (max * 1000) * Math.random() ** 0.5;
        const theta = Math.random() * 2 * Math.PI; // random * (360deg in radians)

        const dy = r * Math.sin(theta);
        const dx = r * Math.cos(theta);

        const newLatitude = latitude + dy / DEGREE;
        const newLongitude = longitude + dx / (DEGREE * Math.cos(Utils.deg2rad(latitude)));
        const distance = Utils.getDistanceFromLatLonInKm(latitude, longitude, newLatitude, newLongitude);

        return {
            newLatitude,
            newLongitude,
            distance
        };
    }

    public static getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = Utils.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = Utils.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(Utils.deg2rad(lat1)) * Math.cos(Utils.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km

        return d;
    }

    public static deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    public static listKeyErrorNetwork = ['ERR_TIMED_OUT', 'ERR_INTERNET_DISCONNECTED']
    public static getMessageError(error: any): string {
        try {
            let errorMsg = '';
            if (typeof error.message === 'string') {
                errorMsg = error.message;
            } else if (typeof error === 'string') {
                errorMsg = error;
            } else {
                for (const property in error) {
                    errorMsg += `\n${error[property].join('\n')}`;
                }
                return errorMsg;
            }

            // bắt lỗi kết nối mạng 
            if (this.listKeyErrorNetwork.some(value => errorMsg.includes(value))) {
                return 'Vui lòng kiểm tra kết nối mạng!';
            }
            if (errorMsg.includes('getaddrinfo') && errorMsg.includes('ENOTFOUND')) {
                return 'Vui lòng kiểm tra kết nối mạng!';
            }
            if (errorMsg === 'RequestTimeout') {
                return 'Đường truyền yếu vui lòng kiểm tra lại kết nối mạng';
            }
            return errorMsg;
        } catch (error) {
            return error.message || 'Lỗi ngoại lệ!';
        }
    }

    public static cutStringEnd(orginal: string, startString: string, endString: string): string {
        let result = orginal.split(startString)[1];
        if (!result) return orginal;
        result = result.split(endString)[0];
        return result;
    }

    public static uuidv4(dash: string = '-') {
        return (`xxxxxxxx${dash}xxxx${dash}4xxx${dash}yxxx${dash}xxxxxxxxxxxx`).replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static sleep(ms: number) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('')
            }, ms)
        })
    }
}
