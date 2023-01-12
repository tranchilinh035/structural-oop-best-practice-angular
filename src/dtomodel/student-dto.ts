import { Student } from "src/model/Student";

export class StudentDTO {
    public id_class;
    public id_student;
    public id_user;
    public name;
    public gender;
    public dob;
    public average_score;

    public dtoToStudent(): Student {
        let student: Student = new Student();
        student.name = this.name;
        student.dob = this.dob;
        student.gender = this.gender;
        student.checked = false;
        return student;
    }
}