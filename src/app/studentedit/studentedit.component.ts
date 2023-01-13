import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/model/Student';
import { SweetalertControl } from '../../control/sweetalert';
import { BusInformationAllClassService } from '../../services/bus-information-all-class.service';
import { ToastControl } from '../../control/toast-control';
import { Utils } from '../../utils';
import { Constant } from '../../utils/Constant';
import { DTOControl } from '../../control/dto-control';
import { StudentEditDTO } from 'src/dtomodel/student-edit-dto';
import { StudentEditDTO2 } from 'src/dtomodel/student-edit2-dto';
import { DatePipe } from '@angular/common';
import { _Class } from 'src/model/_Class';

@Component({
  selector: 'app-studentedit',
  templateUrl: './studentedit.component.html',
  styleUrls: ['./studentedit.component.css']
})
export class StudenteditComponent implements OnInit {
  @Input() class: _Class;

  public student: Student;
  public studentEditable: Student;

  constructor(private busInformationAllClassService: BusInformationAllClassService,
    private datePipe: DatePipe) { }

  ngOnInit() {

  }

  public setStudent(student: Student) {
    this.student = student;
    this.studentEditable = (<any>window).require('lodash.clonedeep')(student);
  }

  public closeModalEditStudentInformation() {
    this.studentEditable = null;
  }

  public async handleEditStudent() {
    SweetalertControl.startLoading('Đang thay đổi...', '');
    try {
      let dtoControl: DTOControl = new DTOControl();
      let studentEditDTO: StudentEditDTO = dtoControl.getStudentEditDTO(this.studentEditable);

      await this.busInformationAllClassService.editStudent(studentEditDTO);

      let index = this.class.students.map(student => student.id).indexOf(this.studentEditable.id);
      this.class.students[index] = this.studentEditable;

      ToastControl.showSuccessToast('Sửa đổi học sinh thành công');
      this.closeModalEditStudentInformation();
    } catch (error) {
      ToastControl.showErrorToast(Utils.getMessageError(error), 'Xảy ra lỗi khi thay đổi thông tin học sinh.')
    }
    SweetalertControl.endLoading();
  }

  public parseDate(dateString: string) {
    if (dateString) {
      let date = new Date(dateString);
      return this.datePipe.transform(date, 'MM/dd/yyyy');
    }
    return null;
  }
}
