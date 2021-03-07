export class Meeting {
  
  constructor( 
     public titre: string,
     public date_deb: string,
     public date_fin: string,
      public lieu: string,
     public join: boolean,
     public photos: any[] ) {}
}
