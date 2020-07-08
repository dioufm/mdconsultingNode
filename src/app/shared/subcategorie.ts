export class SubCategorie {
   _id: string;
   code: string;
   name: string;
   icon: string;
   level: number;
   public constructor(init?: Partial<SubCategorie>) {
      Object.assign(this, init);
   }
}
