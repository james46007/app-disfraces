import { ArrayType } from '@angular/compiler';

export class User{
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public roles: string[]
    ){}
}