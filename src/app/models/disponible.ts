export class Disponible{
    constructor(
        public id: number,
        public name: string,
        public article_id: number,
        public description: 'DISPONIBLE',
        public entrada: number,
        public maximo: number,
        public code: string,
        public date: string,
    ){}
}