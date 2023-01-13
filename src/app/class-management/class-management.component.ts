import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { _Class } from 'src/model/_Class';
import { ToastControl } from '../../control/toast-control';
import { SweetalertControl } from '../../control/sweetalert';
import { Student } from 'src/model/Student';
import { Utils } from '../../utils';
import { Constant } from '../../utils/Constant';
import { BusInformationAllClassService } from '../../services/bus-information-all-class.service';
import { StudenteditComponent } from '../studentedit/studentedit.component';
import { DTOControl } from '../../control/dto-control';
import { StudentDeleteDTO } from 'src/dtomodel/student-delete-dto';
import { StudentcreateComponent } from '../studentcreate/studentcreate.component';

@Component({
	selector: 'app-class-management',
	templateUrl: './class-management.component.html',
	styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {
	@Input() class: _Class;
	@Input() count: number;
	@ViewChild(StudenteditComponent) studentEditComponent: StudenteditComponent;
	@ViewChild(StudentcreateComponent) studentCreateComponent: StudentcreateComponent;

	constructor(private busInformationAllClassService: BusInformationAllClassService) { }

	ngOnInit() {
	}

	public checkAllStudent(event: any) {
		let isChecked = event.target.checked
		for (let i = 0; i < this.class.students.length; i++) {
			this.class.students[i].checked = isChecked
		}
	}

	public async handleAllDeleteStudentChecked() {
		if (this.class.students.length === 0) {
			ToastControl.showWarningToast('Lớp học không có học sinh');
			return;
		}
		let listStudentsChecked = this.class.students.filter(std => std.checked);
		if (listStudentsChecked.length === 0) {
			ToastControl.showWarningToast('Vui lòng chọn học sinh muốn xoá!');
			return;
		}
		if (!confirm(`Bạn có chắc muốn xoá tất cả học sinh được chọn?`)) {
			return;
		}
		SweetalertControl.startLoading('Đang xoá...', '');
		for (let i = 0; i < listStudentsChecked.length; i++) {
			if (listStudentsChecked[i].checked) {
				await this.handleDeleteStudent(listStudentsChecked[i], false);
			}
		}
		SweetalertControl.endLoading();
	}

	public async handleDeleteStudent(student: Student, showConfirm = true) {
		if (showConfirm) {
			if (!confirm(`Bạn có chắc muốn xoá học sinh ${student.name}?`)) {
				return;
			}
			SweetalertControl.startLoading('Đang xoá...', '');
		}

		try {
			let dtoControl: DTOControl = new DTOControl();
			let studentDeleteDTO: StudentDeleteDTO = dtoControl.getStudentDeleteDTO(student);

			await this.busInformationAllClassService.deleteStudent(studentDeleteDTO);

			this.class.students = this.class.students.filter(std => std.id !== student.id);

			ToastControl.showSuccessToast(`Đã xoá học sinh ${student.name}`);
		} catch (error) {
			ToastControl.showErrorToast(Utils.getMessageError(error), `Xảy ra lỗi khi xoá học sinh ${student.name}!`)
		}
		if (showConfirm) {
			SweetalertControl.endLoading();
		}
	}

	public showModalEditStudent(student: Student) {
		this.studentEditComponent.setStudent(student);
	}

	public showModalCreateStudent() {
		this.studentCreateComponent.openModal();
	}
}
