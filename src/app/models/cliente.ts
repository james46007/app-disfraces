export class Cliente{
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public identity_card: string,
        public direction: string,
        public cellphone: string,
        public email: string,
    ){}
}