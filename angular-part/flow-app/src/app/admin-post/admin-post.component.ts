import { Component, OnInit } from '@angular/core';
import { Publication } from "src/app/common/data/Publication";
import { PublicationService } from "src/app/common/service/publication.service";
import { NgForm } from "@angular/forms";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {

  msg : string ="";
  filtrePost = "news"; //ou "atelier_ecriture"
  detailType : string  = "none"; //ou "link" ou "file" ou "text"
  publication : Publication = new Publication();

  imageFileToUpload: File = null;
  detailFileToUpload: File = null;
  //let formData : Form; in onSubmit() /uploadData() 
  //     where JSON "publication" data will be sent as a subpart of formData !!!!	

  tabPublications : Publication[]=[];
  nbToDelete :number = 0;
  nbDeleted :number = 0;
  nbNotDeleted :number = 0;

  constructor(private _publicationService : PublicationService) { }

  onSubmit(){
        this.uploadData();
  }

  ngOnInit() {
  }


convertDate(d) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
}

  uploadData(){
    this.publication.date = this.convertDate(new Date());
    console.log( "publication/message in the bottle" + JSON.stringify(this.publication) ) ;

    const formData: FormData = new FormData();
    formData.append('imageFile' , this.imageFileToUpload); //may be null
    formData.append('detailsFile' , this.detailFileToUpload); //may be null
    formData.append('publication' , JSON.stringify(this.publication));
    //NB: JSON "publication" data will be sent as a subpart of formData !!!!	
    this._publicationService.uploadPublicationFormaDataObservable(formData)
        .subscribe(
          sentPublication => { console.log("sent publication:" + JSON.stringify(sentPublication));
                               this.msg="publication bien envoyée" } ,
          error => {console.log(error); this.msg = "erreur" } 
          );
  }

  handleImageFileInput(files: FileList) {
    this.imageFileToUpload = files.item(0);
    this.publication.fichier_image_name=this.imageFileToUpload.name; //.name , .size , .type
  } 
  
  handleDetailFileInput(files: FileList) {
    this.detailFileToUpload = files.item(0);
    this.publication.fichier_details_name=this.detailFileToUpload.name; //.name , .size , .type
  } 

  onRechercherPublications(){
    this._publicationService.getListePublicationObservable(this.filtrePost)
        .subscribe(listePublications => { this.tabPublications = listePublications } ,
                   error => {console.log(error); this.msg = "erreur" } 
                   );
}

ifEndOfDelete(){
   if(this.nbDeleted==this.nbToDelete){
     this.msg="suppression(s) bien effectuee(s)";
     this.onRechercherPublications();
   }
   else if(this.nbNotDeleted > 0){
    this.msg="une suppression ne s'est pas bien effectuee";
    if((this.nbDeleted + this.nbDeleted) == this.nbToDelete){
      this.onRechercherPublications();
    }
   }
}

onSupprimerPublicationsSelectionnees(){
  let n = this.tabPublications.length;
  this.nbToDelete = 0;
  for(let p of this.tabPublications){
    if(p.selection){
      this.nbToDelete++;
    }
  }
  for(let p of this.tabPublications){
    if(p.selection){
      this._publicationService.deletePublicationServerSide(p._id)
      .subscribe((val)=>{this.nbDeleted++; this.ifEndOfDelete()},
                (error)=>{this.nbNotDeleted++; this.ifEndOfDelete()});
     
    }
  }
}

@ViewChild('formPublication') 
form : NgForm ;

/*
<form #formPublication="ngForm"  (mouseenter)="onFormInit()" ....>
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
