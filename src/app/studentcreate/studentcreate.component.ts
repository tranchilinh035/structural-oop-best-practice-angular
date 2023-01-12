import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DTOControl } from 'src/control/dto-control';
import { SweetalertControl } from 'src/control/sweetalert';
import { ToastControl } from 'src/control/toast-control';
import { StudentCreateDTO } from 'src/dtomodel/student-create-dto';
import { Student } from 'src/model/Student';
import { _Class } from 'src/model/_Class';
import { BusInformationAllClassService } from 'src/services/bus-information-all-class.service';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-studentcreate',
  templateUrl: './studentcreate.component.html',
  styleUrls: ['./studentcreate.component.css']
})
export class StudentcreateComponent implements OnInit {
  public studentCreate: Student;
  @Input() class: _Class;

  constructor(private busInformationAllClassService: BusInformationAllClassService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    
  }

  public openModal() {
    this.studentCreate = new Student();
    this.studentCreate.name = "";
    this.studentCreate.dob = "";
    this.studentCreate.gender = "Nam";
    this.studentCreate.class = this.class;
  }

  public parseDate(dateString: string) {
		if (dateString) {
			let date = new Date(dateString);
			return this.datePipe.transform(date, 'MM/dd/yyyy');
		}
		return null;
	}
  
  private validateFormAddStudent() {
		let {name, dob, gender} = this.studentCreate;
		if (!name.trim() || !dob || !gender) {
			ToastControl.showWarningToast('Vui lòng đền đầy đủ các field!');
			return false;
		}
		let date = new Date(dob);
		if (date.getTime() >= (new Date()).getTime()) {
			ToastControl.showWarningToast('Không chọn ngày tương lai cho ngày sinh!');
			return false;
		}
		return true;
	}

  public async handleCreateStudent() {
    let isValidateFormAddStudent = this.validateFormAddStudent();
		if (!isValidateFormAddStudent) {
			return;
		}

    SweetalertControl.startLoading('Đang thêm học sinh...', '');
		try {

      let dtoControl: DTOControl = new DTOControl();
      let studentCreateDTO: StudentCreateDTO = dtoControl.getStudentCreateDTO(this.studentCreate);

      let student: Student = await this.busInformationAllClassService.createStudent(studentCreateDTO);
  
      this.class.students.push(student);
    
      ToastControl.showSuccessToast('Thêm học sinh thành công');

      this.closeModal();
    } catch (error) {
      ToastControl.showErrorToast(Utils.getMessageError(error), 'Xảy ra lỗi khi thêm học sinh.')
    }
    SweetalertControl.endLoading();
  }

  public closeModal() {
    this.studentCreate = null;
  }
}
