import { StudentDTO } from "./student-dto";

export class StudentCreateDTO extends StudentDTO {
    public id_class;
    public id_user;
    public name;
    public gender;
    public dob;
    public average_score;
}