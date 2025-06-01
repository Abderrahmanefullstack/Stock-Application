import { Product } from './product';

export interface Stock {
    _id?: string;
    produitId: string | Product;
    quantite: number;
    seuilAlert: number;
}