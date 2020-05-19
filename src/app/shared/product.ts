import { User } from './user';

export class Product {
   _id: string;
   typeOffre: string;
   typeProduct: string;
   surface: number;
   nbPieces: number;
   titre: string;
   description: string;
   prix: Number;
   region: string;
   departement: string;
   ville: string;
   user: User

   public constructor(init?: Partial<Product>) {
      Object.assign(this, init);
   }
}