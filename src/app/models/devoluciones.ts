export class Devolucion{
    entrada: any;
    constructor(
        public id: number,
        public devuelto: number,
        public articulo: string,
        public code: string,
        public quantity: number,
        public exi_val_uni: number,
        public article_id: number,
        public estado: number,
        public description: string,
        public date: string,
    ){}
}