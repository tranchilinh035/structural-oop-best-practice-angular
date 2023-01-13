import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Student } from "src/model/Student";
import { ToastControl } from "../control/toast-control";
import { slideInAnimation } from "./route-animation";
import { BusInformationAllClassService } from "../services/bus-information-all-class.service";
import { Utils } from "../utils";
import { Constant } from "../utils/Constant";
import { DatePipe } from '@angular/common';
import { SweetalertControl } from "../control/sweetalert";
import { _Class } from "src/model/_Class";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
	public listClass: _Class[] = [];


	public isLoading = {
		ngOnInitComponent: true,
	}

	constructor(
		private busInformationAllClassService: BusInformationAllClassService
	) { }

	async ngOnInit() {
		await this.getListInformationClass();
		this.isLoading.ngOnInitComponent = false;
	}

	private async getListInformationClass() {
		try {
			await this.busInformationAllClassService.getListInformationClass(Constant.USER_ID);
			this.listClass = this.busInformationAllClassService.listClass;
		} catch (error) {
			ToastControl.showErrorToast(Utils.getMessageError(error), 'Xảy ra lỗi khi lấy danh sách lớp học.')
		}
	}
}
