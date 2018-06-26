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
        { label : "Biographie/Récit de vie" , path : "biographie_recitVie" } ,
        { label : "Administration" , path : "administratif" },
        { label : "Atelier d'écriture" , path : "atelier_ecriture" },
        { divider : true },
        { label : "Tarifs" , path : "tarifs" }
      ]
    },
    { label : "Florilège du mois" , path : "florilege" } , 
    { label : "Qui suis-je ?" , path : "pres_alexandra" } ,
    { label : "contact ?" , path : "contact" } ,
    { label : "administration" , 
    children : [
      { label : "admin contact" , path : "admin_contact" } ,
      { label : "admin publication" , path : "admin_publication" }
      ]
    }
    ];
  

  constructor() { }

  ngOnInit() {
  }

}
