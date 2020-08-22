export class Categorie {
   _id: string;
   code: string;
   name: string;
   level: number;
   color: string;
   icon: string;
   subcategories: any;

   public constructor(init?: Partial<Categorie>) {
      Object.assign(this, init);
   }
}
