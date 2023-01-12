import { Injectable } from '@angular/core';
import { StudentDTO } from 'src/dtomodel/student-dto';
import { environment } from 'src/environments/environment';
import { Student } from 'src/model/Student';
import { ExamApiService } from 'src/request/exam-api';

@Injectable({
    providedIn: 'root'
})
export class DaoStudentService {
    private baseUrl = environment.baseUrl;
    private examApiService = new ExamApiService();

    constructor() { }

    public async createStudent(student: StudentDTO) {
        return await this.examApiService.sendPost(`${this.baseUrl}/api/create-student`, student, {});
    }

    public async editStudent(student: StudentDTO) {
        return await this.examApiService.sendPost(`${this.baseUrl}/api/edit-student`, student, {});
    }

    public async deleteStudent(student: StudentDTO) {
        return await this.examApiService.sendPost(`${this.baseUrl}/api/delete-student`, student, {});
    }
}
