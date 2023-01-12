import { StudentEditDTO } from "src/dtomodel/student-edit-dto";
import { Constant } from "../utils/Constant";
import { StudentDeleteDTO } from "src/dtomodel/student-delete-dto";
import { Student } from "src/model/Student";
import { StudentCreateDTO } from "src/dtomodel/student-create-dto";

export class DTOControl {
    public getStudentEditDTO(student: Student): StudentEditDTO {
        let studentEditDTO: StudentEditDTO = new StudentEditDTO();
        studentEditDTO.id_user = Constant.USER_ID;
        studentEditDTO.id_student = student.id;
        studentEditDTO.dob = student.dob;
        studentEditDTO.gender = student.gender;
        studentEditDTO.name = student.name;

        return studentEditDTO;
    }

    public getStudentDeleteDTO(student: Student): StudentDeleteDTO {
        let studentDeleteDTO: StudentDeleteDTO = new StudentDeleteDTO();
        studentDeleteDTO.id_user = Constant.USER_ID;
        studentDeleteDTO.id_student = student.id;

        return studentDeleteDTO;
    }

    public getStudentCreateDTO(student: Student): StudentCreateDTO {
        let studentCreateDTO: StudentCreateDTO = new StudentCreateDTO;
        studentCreateDTO.name = student.name;
        studentCreateDTO.dob = student.dob;
        studentCreateDTO.id_class = student.class.id;
        studentCreateDTO.id_user = Constant.USER_ID;
        studentCreateDTO.gender = student.gender;
        
        return studentCreateDTO;
    }
}