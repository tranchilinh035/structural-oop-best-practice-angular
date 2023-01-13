import { Student } from "src/model/Student";
import { _Class } from "src/model/_Class";

export class AdapterObject {
    public mapListClass(jsonObject): _Class[] {
        let arrClass: _Class[] = [];
        for (let i = 0; i < jsonObject.length; i++) {
            let arrStudent: Student[] = [];
            let myClass = new _Class();
            myClass.id = jsonObject[i].id;
            myClass.name = jsonObject[i].name;
            myClass.students = arrStudent;
            let listStudent = jsonObject[i].students;

            for (let j = 0; j < listStudent.length; j++) {
                let studentFromApi = listStudent[j];
                let classFromApi = studentFromApi.class;

                let student: Student = new Student();
                student.id = studentFromApi.id;
                student.name = studentFromApi.name;
                student.gender = studentFromApi.gender;
                student.dob = studentFromApi.dob;

                if (classFromApi != null) {
                    let classOfStudent: _Class = new _Class();
                    classOfStudent.id = classFromApi.id;
                    classOfStudent.name = classFromApi.name;
                    student.class = classOfStudent;
                }

                arrStudent.push(student);
            }
            arrClass.push(myClass);
        }

        return arrClass;
    }

    public mapStudent(jsonObject): Student {
        let student: Student = new Student();
        student.id = jsonObject.id;
        student.name = jsonObject.name;
        student.dob = jsonObject.dob;
        student.gender = jsonObject.gender;

        let classFromApi = jsonObject.class;
        let classOfStudent: _Class = new _Class();
        classOfStudent.id = classFromApi.id;
        classOfStudent.name = classFromApi.name;

        student.class = classOfStudent;

        return student;
    }
}