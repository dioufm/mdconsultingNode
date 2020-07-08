import { User } from './user';

export class Product {
   _id: string;
   typeOffre: string;
   newProduct: string;
   categorieProduct: string;
   subCategorieProduct: string;
   typeProduct: string;

   surface: number;
   nbPieces: number;

   marque: string;
   modele: string;
   km: string;
   boiteVitesse: string;
   carburant: string;
   nbPlaces: string;

   titre: string;
   description: string;
   prix: Number;
   ville: string;
   villeName: string;
   user: User;
   productCaracteritiques: any;

   public constructor(init?: Partial<Product>) {
      Object.assign(this, init);
   }
}