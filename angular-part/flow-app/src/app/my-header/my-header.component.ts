import { Component, OnInit, Input } from '@angular/core';
import { MenuDefinition } from "src/bs-util/data/MenuDefinition";

@Component({
  selector: 'my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.css']
})
export class MyHeaderComponent implements OnInit {

  @Input()
  title : string = "";

  myMenuDefs :MenuDefinition[] = [
    { label : "Prestations et tarifs" , 
      children : [
        { label : "Biographie/Récit de vie" , path : "ngr/biographie_recitVie" } ,
        { label : "Administration" , path : "ngr/administratif" },
        { label : "Atelier d'écriture" , path : "ngr/atelier_ecriture" },
        { divider : true },
        { label : "Tarifs" , path : "ngr/tarifs" }
      ]
    },
    { label : "Florilège du mois" , path : "ngr/florilege" } , 
    { label : "Qui suis-je ?" , path : "ngr/pres_alexandra" } ,
    { label : "Contact" , path : "ngr/contact" }
    /* ,
    { label : "administration" , 
    children : [
      { label : "admin contact" , path : "ngr/admin_contact" } ,
      { label : "admin publication" , path : "ngr/admin_publication" }
      ]
    } */
    ];
  

  constructor() { }

  ngOnInit() {
  }

}
