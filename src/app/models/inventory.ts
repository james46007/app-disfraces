export class Inventory{
    constructor(
        public id: number,
        public article_id: number,
        public date: string,
        public description: string,
        public entrada: number,
        public ent_val_uni: number,
        public ent_val_tot: number,
        public salida: number,
        public sal_val_uni: number,
        public sal_val_tot: number,
        public existe: number,
        public exi_val_uni: number,
        public exi_val_tot: number,
        public estado: number,
    ){}
}