import {PostGetRequestService} from "../request/post-get-request";

export class GetInfoMyIp extends PostGetRequestService {
    private _dataInfo: any;

	constructor() {
		super();
	}

	async task(): Promise<void> {
		let url = 'http://www.geoplugin.net/json.gp';
		let data: any = await this.sendGet(url, {});
		this._dataInfo = JSON.parse(data.data);
	}

	get dataInfo(): any {
		return this._dataInfo;
	}
}
