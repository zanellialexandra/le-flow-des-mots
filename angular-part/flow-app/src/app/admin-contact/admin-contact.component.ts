import { Component, OnInit } from '@angular/core';
import { Contact } from "src/app/common/data/Contact";
import { ContactService } from "src/app/common/service/contact.service";

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {

  tabContacts : Contact[] = [];
  msg:string ="";
  nbToDelete :number = 0;
  nbDeleted :number = 0;
  nbNotDeleted :number = 0;

  constructor(private _contactService: ContactService) { }

  ngOnInit() {
  } 

  onRechercherContacts(){
      this._contactService.getListeContactObservable()
          .subscribe(listeContacts => { this.tabContacts = listeContacts } ,
                     error => {console.log(error); this.msg = "erreur" } 
                     );
  }

  ifEndOfDelete(){
     if(this.nbDeleted==this.nbToDelete){
       this.msg="suppression(s) bien effectuee(s)";
       this.onRechercherContacts();
     }
     else if(this.nbNotDeleted > 0){
      this.msg="une suppression ne s'est pas bien effectuee";
      if((this.nbDeleted + this.nbDeleted) == this.nbToDelete){
        this.onRechercherContacts();
      }
     }
  }

  onSupprimerContacts(){
    let n = this.tabContacts.length;
    this.nbToDelete = 0;
    for(let c of this.tabContacts){
      if(c.selection){
        this.nbToDelete++;
      }
    }
    for(let c of this.tabContacts){
      if(c.selection){
        this._contactService.deleteContactServerSide(c._id)
        .subscribe((val)=>{this.nbDeleted++; this.ifEndOfDelete()},
                  (error)=>{this.nbNotDeleted++; this.ifEndOfDelete()});
       
      }
    }
  }

}
