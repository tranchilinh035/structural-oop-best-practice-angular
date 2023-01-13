import { Student } from "./Student";

export class _Class {
    private _id: number;
    private _name: string = '';
    private _students: Student[] = [];

    constructor() { }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get students(): Student[] {
        return this._students;
    }

    set students(value: Student[]) {
        this._students = value;
    }
}

