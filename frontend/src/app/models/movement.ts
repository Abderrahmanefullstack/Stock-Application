import { Product } from './product';

export interface Movement {
    _id?: string;
    produitId: string | Product;
    type: 'entree' | 'sortie';
    quantite: number;
    date: Date;
    utilisateurId?: string;
}