import { PostGetRequestService } from './post-get-request';

export class ExamApiService extends PostGetRequestService {
    constructor() {
        super();
    }

    public async sendGet(url: string, headers: any, proxy?: string) {
        headers['Content-Type']='application/x-www-form-urlencoded';
        let result = await super.sendGet(url, headers, proxy);
        return result;
    }

    public async sendPost(url: string, dataPost: any, headers: object, proxy?: string) {
        headers['Content-Type']='application/x-www-form-urlencoded';
        let result = await super.sendPost(url, dataPost, headers, proxy);
        return result;
    }
}
