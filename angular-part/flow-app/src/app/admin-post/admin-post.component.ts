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

  msgSaveOrUpdate : string ="";
  msg : string ="";

  datePublicationModel = null; //{ "year" : 2018 , "month" : 12 , day : 25 };

  defaultPublication = new Publication();//empty publication by default
  selectedPublication =  this.defaultPublication;
  confirmDelete :boolean = false;
  mode : string = "newOne" ; //ou "existing"

  filtrePost : string = "news"; //ou "atelier_ecriture"
  detailType : string  = "none"; //ou "link" ou "file" ou "text"
  //publication now replaced by selectedPublication

  imageFileToUpload: File = null;
  detailFileToUpload: File = null;
  //let formData : Form; in onSubmit() /uploadData() 
  //     where JSON "publication" data will be sent as a subpart of formData !!!!	

  tabPublications : Publication[]=[];
  
  constructor(private _publicationService : PublicationService) { }

  private initDatePublicationModelFromCurrentDate(){
    let d : Date= new Date();
    this.datePublicationModel = { "year" : d.getFullYear() , "month" : d.getMonth()+1 , day : d.getDate()};
  } 

  private initSelectedPubDateFromDatePublicationModel(){
    let dpm = this.datePublicationModel ;
    let d : Date = new Date();
    d.setFullYear(dpm.year);
    d.setMonth(dpm.month-1);
    d.setDate(dpm.day);
    this.selectedPublication.date = this.convertDate(d);
  }

  private initDatePublicationModelFromSelectedPubDate(){
    let d : Date= new Date(this.selectedPublication.date);
    this.datePublicationModel = { "year" : d.getFullYear() , "month" : d.getMonth()+1 , day : d.getDate()};
  }
   
  
  public essentielPublicationString(pub : Publication) :string{
    return  pub.date + " , " + pub.titre ; 
  }

  //pour <select [(ngModel)]="selectedPublication"   size="8"
  //            (change)="onChangeSelectedPublication($event)">
  onChangeSelectedPublication(evt:any){
    this.msgSaveOrUpdate="";
    this.mode="existing";
    this.initDatePublicationModelFromSelectedPubDate();
    this.resetFileInputs();
    if(this.selectedPublication._id){
      this.msg="sélection courante = publication existante modifiable"; 
      if(this.selectedPublication.texte_complet!=null)
        this.detailType="text";
      else if(this.selectedPublication.lien_externe!=null)
          this.detailType="link";
      else if(this.selectedPublication.fichier_details_name!=null)
        this.detailType="file";
      else 
         this.detailType="none";
    }
    else {
      this.msg=""; this.detailType="none";
    }
    this.confirmDelete=false;
  }

 onFiltrePostChange(){
   this.tabPublications=[];
   this.onNouvellePublication();
 }

 onNouvellePublication(){
  this.mode="newOne";
  this.msg="sélection courante = nouvelle publication"; 
  this.msgSaveOrUpdate="nouvelle publication par encore publiée";
  this.detailType="none";
  this.defaultPublication = new Publication();
  this.defaultPublication.categorie=this.filtrePost;//"news" ou "atelier_ecriture"
  this.selectedPublication = this.defaultPublication;
  this.imageFileToUpload = null;
  this.detailFileToUpload = null;
  this.initDatePublicationModelFromCurrentDate();
  this.resetFileInputs();
 }

 @ViewChild('f_imageFile') 
 imageFileInput : any ;

 @ViewChild('f_detailsFile') 
 detailsFileInput : any ;

 resetFileInputs(){
  if(this.imageFileInput && this.imageFileInput.nativeElement){
     // console.log("reset imageFileInput")
      this.imageFileInput.nativeElement.value = "";
  }
  if(this.detailsFileInput && this.detailsFileInput.nativeElement){
    // console.log("reset detailsFileInput")
    this.detailsFileInput.nativeElement.value = "";
  }
 }

  onSubmit(){
        this.uploadData();
  }

  ngOnInit() {
    this.onNouvellePublication();
  }


convertDate(d:Date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [d.getFullYear(), pad(d.getMonth()+1) ,pad(d.getDate()) ].join('-');
}

  uploadData(){
    this.initSelectedPubDateFromDatePublicationModel();
    //console.log( "publication/message in the bottle" + JSON.stringify(this.selectedPublication) ) ;

    //supprimer éventuelles informations incohérentes:
    switch(this.detailType){
      case "none":
         this.detailFileToUpload=null;
         this.selectedPublication.fichier_details_name=null;
         this.selectedPublication.texte_complet=null;
         this.selectedPublication.lien_externe=null;
         break;
     case "link":
         this.detailFileToUpload=null;
         this.selectedPublication.fichier_details_name=null;
         this.selectedPublication.texte_complet=null;
         break; 
    case "file":
         this.selectedPublication.lien_externe=null;
         this.selectedPublication.texte_complet=null;
         break; 
    case "text":
         this.detailFileToUpload=null;
         this.selectedPublication.fichier_details_name=null;
         this.selectedPublication.lien_externe=null;
         break;  
    }

    const formData: FormData = new FormData();
    formData.append('imageFile' , this.imageFileToUpload); //may be null
    formData.append('detailsFile' , this.detailFileToUpload); //may be null
    formData.append('publication' , JSON.stringify(this.selectedPublication));
    //NB: JSON "publication" data will be sent as a subpart of formData !!!!	
    this._publicationService.uploadPublicationFormaDataObservable(formData)
        .subscribe(
          sentPublication => { console.log("sent publication:" + JSON.stringify(sentPublication));
                               this.msgSaveOrUpdate="publication bien envoyée";
                               if(this.selectedPublication._id==null){
                                  this.selectedPublication._id = sentPublication._id;
                               }
                               this.addInTabAfterUploadNew(); } ,
          error => {console.log(error); this.msgSaveOrUpdate = "erreur" } 
          );
  }

  addInTabAfterUploadNew(){
     if(this.mode=="newOne"){
       this.tabPublications.push(this.selectedPublication);
       this.mode = "existing";
       this.msg="sélection courante = publication existante modifiable"; 
     }
  }

  handleImageFileInput(files: FileList) {
    this.imageFileToUpload = files.item(0);
    this.selectedPublication.fichier_image_name=this.imageFileToUpload.name; //.name , .size , .type
  } 
  
  handleDetailFileInput(files: FileList) {
    this.detailFileToUpload = files.item(0);
    this.selectedPublication.fichier_details_name=this.detailFileToUpload.name; //.name , .size , .type
  } 

  onRechercherPublications(){
    this.onNouvellePublication();
    this.confirmDelete=false;
    this._publicationService.getListePublicationObservable(this.filtrePost)
        .subscribe(listePublications => { this.tabPublications = listePublications } ,
                   error => {console.log(error); this.msg = "erreur" } 
                   );
}



endOfDelete(){
  this.msg="suppression bien effectuée";
  this.onRechercherPublications();
}

onSupprimerPublication(){
  this._publicationService.deletePublicationServerSide(this.selectedPublication._id)
      .subscribe((val)=>{this.endOfDelete()},
                (error)=>{this.msg="echec suppression";});

   this.confirmDelete=false;
   this.defaultPublication = new Publication();
   this.selectedPublication = this.defaultPublication;      
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
