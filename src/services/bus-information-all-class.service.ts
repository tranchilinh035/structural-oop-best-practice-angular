import { Injectable } from '@angular/core';
import { Student } from 'src/model/Student';
import { BusStudentService } from './bus-student.service';
import { DaoInformationAllClassService } from './dao-information-all-class.service';
import { _Class } from 'src/model/_Class';
import { StudentDTO } from 'src/dtomodel/student-dto';
import { AdapterObject } from '../control/adapter';
@Injectable({
    providedIn: 'root'
})
export class BusInformationAllClassService {
    private _listClass: _Class[] = [];

    constructor(
        private daoInformationAllClassService: DaoInformationAllClassService,
        private busStudentService: BusStudentService
    ) { }

    get listClass(): _Class[] {
        return this._listClass;
    }

    public async getListInformationClass(idUser: number): Promise<_Class[]> {
        let resGetListInformationClass: any = await this.daoInformationAllClassService.getListInformationClass({ id_user: idUser });
        let result = JSON.parse(resGetListInformationClass.data);
        if (!(result.status === 'success')) {
            throw result.message;
        }

        let adapter: AdapterObject = new AdapterObject();
        this._listClass = adapter.mapListClass(result.data);
        return result.data;
    }

    public async editStudent(studentDTO: StudentDTO): Promise<Object> {
        let result = await this.busStudentService.editStudent(studentDTO);
        if (!(result.status === 'success')) {
            throw result.message;
        }
        return result;
    }

    public async deleteStudent(studentDTO: StudentDTO): Promise<Object> {
        let result = await this.busStudentService.deleteStudent(studentDTO);
        if (!(result.status === 'success')) {
            throw result.message;
        }
        return result;
    }

    public async createStudent(studentDTO: StudentDTO): Promise<Student> {
        let result = await this.busStudentService.createStudent(studentDTO);
        if (!(result.status === 'success')) {
            throw result.message;
        }
        let adapter: AdapterObject = new AdapterObject();
        let student: Student = adapter.mapStudent(result.data);
        return student;
    }
}
