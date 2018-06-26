export class Contact {
    _id? : string ;
    nom : string;
    prenom? : string;
    adresse? : string;
    telephone : string;
    email : string;
    objet : string; 
    message : string;
    date : string ;  //ex: "2018-07-01"
    statut : string ; //ex: "nouveau"

    selection? : boolean ; //selection locale seulement
}