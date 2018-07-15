import { Component, OnInit } from '@angular/core';
import { Contact } from "src/app/common/data/Contact";
import { ContactService } from "src/app/common/service/contact.service";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {

  tabContacts : Contact[] = [];
  defaultContact = new Contact();//empty contact by default
  selectedContact =  this.defaultContact;
  msg:string ="";
  confirmDelete :boolean = false;

  constructor(private _contactService: ContactService) { }

  ngOnInit() {
  } 

  public essentielContactString(contact : Contact) :string{
    return  contact.prenom + " " + contact.nom
        + " , objet=" + contact.objet + " , email=" + contact.email ; 
  }

  //pour <select [(ngModel)]="selectedContact"   size="8"
  //            (change)="onChangeSelectedContact($event)">
  onChangeSelectedContact(evt:any){
    this.msg="";
    this.confirmDelete=false;
  }

  /*
  //pour <select (change)="onChangeSelectedContactId($event)"
  //<option *ngFor="let contact of tabContacts"
  //[value]="contact._id">{{essentielContactString(contact)}}</option>
  onChangeSelectedContactId(event:any){
     let selectedContactId = event.target.value;
     console.log("selectedContactId:" + selectedContactId);
     //this.selectedContact = ...;
  }
  */
/*
  //pour <option *ngFor="let contact of tabContacts" 
  //             (click)="onChangeSelectedContact(contact)">...
  onChangeSelectedContact(contact:Contact){
    this.selectedContact = contact;
    this.msg="";
    this.confirmDelete=false;
    //console.log("selectedContact:" + JSON.stringify(this.selectedContact));
 }


 //<select #selectContact size="8">
 @ViewChild('selectContact') 
 selectContactElement : HTMLSelectElement; 
*/

 onNouveauContact(){
  this.msg="";
  this.defaultContact = new Contact();
  this.selectedContact = this.defaultContact;
 
 }

  onRechercherContacts(){
      this.selectedContact = this.defaultContact;
      this.confirmDelete=false;
      this._contactService.getListeContactObservable()
          .subscribe(listeContacts => { this.tabContacts = listeContacts } ,
                     error => {console.log(error); this.msg = "erreur" } 
                     );
  }

  endOfDelete(){
       this.msg="suppression bien effectuee";
       this.onRechercherContacts();
  }

  onSupprimerContact(){
        this._contactService.deleteContactServerSide(this.selectedContact._id)
        .subscribe((val)=>{this.endOfDelete()},
                  (error)=>{this.msg="echec suppression";});
        this.confirmDelete=false;
        this.defaultContact = new Contact();
        this.selectedContact = this.defaultContact;      
  }

}
