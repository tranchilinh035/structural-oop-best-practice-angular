import { _Class } from "./_Class";
export class Student {
    private _id: number;
    private _name: string = '';
    private _gender: string = '';
    private _dob: string = '';
    private _class: _Class = new _Class();
    private _checked: boolean = false;

    constructor() {}

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

    get gender(): string {
        return this._gender;
    }

    set gender(value: string) {
        this._gender = value;
    }

    get dob(): string {
        return this._dob;
    }

    set dob(value: string) {
        this._dob = value;
    }

    get class(): _Class {
        return this._class;
    }

    set class(value: _Class) {
        this._class = value;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        this._checked = value;
    }
}