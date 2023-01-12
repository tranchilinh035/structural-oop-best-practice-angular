import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExamApiService } from 'src/request/exam-api';

@Injectable({
    providedIn: 'root'
})
export class DaoInformationAllClassService {
    private baseUrl = environment.baseUrl;
    private examApiService = new ExamApiService();

    constructor() { }

    public async getListInformationClass(dataPost: any) {
        let url = `${this.baseUrl}/api/list-class?${new URLSearchParams(dataPost).toString()}`;
        return await this.examApiService.sendGet(url, dataPost);
    }
}