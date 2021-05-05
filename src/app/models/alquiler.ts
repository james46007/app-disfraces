export class Alquiler{
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public article_id: number,
        public date: string,
        public description: string,
        public salida: number,
        public sal_val_uni: number,
        public total: number,
        public estado: number,
        public maximo: number,
    ){}
}