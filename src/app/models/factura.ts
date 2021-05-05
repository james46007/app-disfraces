export class Factura{
    constructor(
        public id: number,
        public customer_id: number,
        public date: string,
        public guarantee_id: number,
        public garantia: string,
        public discount: number,
        public subtotal: number,
        public iva: number,
        public total: number,
        public estado: number,
    ){}
}