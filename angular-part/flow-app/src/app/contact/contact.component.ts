import { Component, OnInit } from '@angular/core';
import { Contact } from "src/app/common/data/Contact";
import { ContactService } from "src/app/common/service/contact.service";
import { NgForm } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

msg=""; //message de statut (après envoie du contact)
         
contact : Contact = {  nom : "" , prenom : "" , adresse : null , telephone : null, 
                      email : "" , objet : "" , message : "" , 
                      date : this.convertDate(new Date()), statut : "nouveau" ,
                      };

convertDate(d) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
}

  constructor(private _contactService : ContactService ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.msg="";
    this._contactService.postContactObservable(this.contact)
                        .subscribe(
                          postContact => { this.contact = postContact ; 
                                           this.msg = "contact as json: " + JSON.stringify(this.contact);} ,
                         error => { console.log(error); this.msg="erreur post contact"}                  
                        )
    
  }


  @ViewChild('formContact') 
  form : NgForm ;

  /*
  <form #formContact="ngForm"  (mouseenter)="onFormInit()" ....>
  */
  onFormInit(){
    //NB: dans ngOnInit() : trop tôt ,  this.form.controls['...'] undefined
    /*
    this.form.controls['age'].setValidators(
      [Validators.required , 
       Validators.min(0), 
       Validators.max(150)]);
     this.form.controls['email'].setValidators(
      [Validators.email]);
    */
  }


}
