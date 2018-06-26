import { Component, OnInit } from '@angular/core';
import { Publication } from "src/app/common/data/Publication";
import { PublicationService } from "src/app/common/service/publication.service";
import { ContextCard } from "src/app/florilege/ContextCard";

@Component({
  selector: 'app-florilege',
  templateUrl: './florilege.component.html',
  styleUrls: ['./florilege.component.css']
})
export class FlorilegeComponent implements OnInit {

  tabPublicationNews : Publication[] =[];
  tabPublicationAteliers : Publication[] = [];
  contextCardsNews : ContextCard[]= [];
  contextCardsAteliers : ContextCard[]= [];

  constructor(private _publicationService : PublicationService) { }
  
  loadPublication(categoriePost){

    this._publicationService.getListePublicationObservable(categoriePost)
        .subscribe(
          (listePublication) => {
                      if(categoriePost=="news"){
                          this.tabPublicationNews=listePublication;
                          this.contextCardsNews=this.build_overview_cards_context_from_publications(this.tabPublicationNews);
                      }
                      else if(categoriePost=="atelier_ecriture"){
                          this.tabPublicationAteliers=listePublication;
                          this.contextCardsAteliers=this.build_overview_cards_context_from_publications(this.tabPublicationAteliers);
                      } 
            } ,
          (error) => { console.log( " error : " + error ) ; }
        );

  }
  

  ngOnInit() {
    this.loadPublication("news");
    this.loadPublication("atelier_ecriture");
  }

  //en entree publication (provenant de la base de données et vehiculées via WS REST JSON
//en sortie cards_context (pour le template templateOverviewCards/templateOverviewCardsScript handlebars)
/*
 publication = { categorie : "atelier_ecriture ou news" , titre : "titre XYZ" , 
                 fichier_image_name : null ,  resume : "<h3>contenuHTML<h3>" , 
				 fichier_details_name : "f1.pdf" , texte_complet: "...." , lien_externe : "" ,
				 date : "2018-06-01", statut : "nouveau"};
contextCards =  [
					  { "title" : "titre A1", "texte" : "<i>contenu</i> <b>A1</b>" , "footer" : '2018-02-01' , "large_html_text" : '...' , "modal_id" : "myModal1"},
                      { "title" : "titre A2", "texte" : "<i>contenu</i> <b>A2</b>" },
					  { "title" : "titre A3", "texte" : "<i>contenu</i> <b>A3</b>" , "footer" : '2018-03-01'},
					  { "title" : "titre A4", "texte" : "<i>contenu</i> <b>A4</b>" , "large_html_text" : '...' , "modal_id" : "myModal2"   }
					  ];
*/


build_overview_cards_context_from_publications(tabPublications) : ContextCard[]{
	var contextCards =  [];
  let num=0;					
	for(let i in tabPublications){
		   num++;
		   let ctxCard : ContextCard = { "title" : null, "texte" :null , "footer" : null , large_html_text : null};
			ctxCard.title=tabPublications[i].titre;
			var texte = tabPublications[i].resume;
			
			var imgSrc="./images/florilege.jpg"; //par defaut
			if(this.notNullAndNotEmpty(tabPublications[i].fichier_image_name)){
				imgSrc="./posts/images/" + tabPublications[i].fichier_image_name;
			}
			var htmlWithImagePrefix = '<img src="'+imgSrc+'" class="maxOverviewSized" /> <br/>';
			texte=htmlWithImagePrefix + texte;
			
			if(this.notNullAndNotEmpty(tabPublications[i].lien_externe)){
				texte = '<a target="_blank" href="'+tabPublications[i].lien_externe+'">' + texte + '</a>';
			}
			if(this.notNullAndNotEmpty(tabPublications[i].texte_complet)){
				ctxCard.large_html_text = tabPublications[i].texte_complet;
				//ctxCard.modal_id = "myModal"+num;??
				//texte = '<a href="#" data-toggle="modal" data-target="#myModal'+num+'">' + texte + '</a>';
				
			}
			else if(this.notNullAndNotEmpty(tabPublications[i].fichier_details_name)){
				texte = '<a target="_blank" href="./posts/'+tabPublications[i].fichier_details_name+'">' + texte + '</a>';
			}
			
			ctxCard.texte= texte;
			ctxCard.footer=tabPublications[i].date;
			contextCards.push(ctxCard);
		}
	return contextCards;
}

notNullAndNotEmpty(str):boolean{
	if(str){
		if(str.length==0)
			return false;
		else 
			return true;
	}
	else{
		return false;
	}
}

}
