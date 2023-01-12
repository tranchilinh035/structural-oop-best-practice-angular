import { Injectable } from '@angular/core';
import { Student } from 'src/model/Student';
import { DaoStudentService } from './dao-student.service';
import { StudentDTO } from 'src/dtomodel/student-dto';

@Injectable({
    providedIn: 'root'
})
export class BusStudentService {

    constructor(
        private daoStudentService: DaoStudentService
    ) { }

    public async createStudent(student: StudentDTO) {
        let resCreateStudent: any = await this.daoStudentService.createStudent(student);
        let result = JSON.parse(resCreateStudent.data);
        if (!(result.status === 'success')) {
            throw result.error;
        };
        return result;
    }

    public async editStudent(student: StudentDTO) {
        let resEditStudent: any = await this.daoStudentService.editStudent(student);
        let result = JSON.parse(resEditStudent.data);
        if (!(result.status === 'success')) {
            throw result.error;
        };
        return result;
    }

    public async deleteStudent(student: StudentDTO) {
        let resDeleteStudent: any = await this.daoStudentService.deleteStudent(student);
        let result = JSON.parse(resDeleteStudent.data);
        if (!(result.status === 'success')) {
            throw result.error;
        };
        return result;
    }
}
