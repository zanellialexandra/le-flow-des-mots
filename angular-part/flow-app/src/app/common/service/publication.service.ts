import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Publication } from "src/app/common/data/Publication";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  private _publicationBaseUrl = "./flow-des-mots/publication" ; //avec ng serve --proxy-config proxy.conf.json
  

  constructor(private _http : HttpClient) { }

  public uploadPublicationFormaDataObservable(publicationFormData : FormData):Observable<Publication> {
    let uploadPublicationUrl : string = "./flow-des-mots/upload_publication";
    return this._http.post<Publication>(uploadPublicationUrl ,publicationFormData );
    }

  //categoriePost = "news" ou "atelier_ecriture"
  public getListePublicationObservable(categoriePost : string):Observable<Publication[]>{
    let publicationUrl : string = this._publicationBaseUrl;
    if(categoriePost) {
      publicationUrl+=("?categorie="+categoriePost);
    }
    return this._http.get<Publication[]>(publicationUrl );
  }

  public deletePublicationServerSide(publicationId):Observable<any>{
    console.log("deleting publication of _id = " +  publicationId );
    let  deletePublicationUrl : string = this._publicationBaseUrl + "/"  +  publicationId ;
    console.log("deletePublicationUrl= " + deletePublicationUrl );
    return this._http.delete(deletePublicationUrl );
   }
 
}
