export class User {
   _id: string;
   id: string;
   username: string;
   firstname: string;
   email: string;
   tel: string;
   telwhatsapp: string;
   accessToken: string;
   token: string;
   password: string;
   newpassword: string;
   roles: any;
   origineConnexion: string;
   dateCreation: Date;
   lastConnexionDate: Date;
   numberproduct: number;
   numberproductachat: number;
   credit: number;
   countnewMessage: number;
   countallMessage: number;


   public constructor(init?: Partial<User>) {
      Object.assign(this, init);
   }
}

export interface Ville {
   code: string;
   name: string;
}

export interface Marque {
   marque: string;
   modeles: Modele[];
}

export interface Modele {
   name: string;
}

export interface BoiteVitesse {
   code: string;
   name: string;
   icon: string;
}
