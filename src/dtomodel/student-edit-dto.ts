import { StudentDTO } from "./student-dto";

export class StudentEditDTO extends StudentDTO {
    public id_student;
    public id_user;
    public name;
    public gender;
    public dob;
    public average_score;
}