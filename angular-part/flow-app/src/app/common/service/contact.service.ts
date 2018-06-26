import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from "src/app/common/data/Contact";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _contactBaseUrl = "./flow-des-mots/contact" ; //avec ng serve --proxy-config proxy.conf.json

  constructor(private _http : HttpClient) { }

  public postContactObservable(contact : Contact):Observable<Contact> {
    let contactUrl : string = this._contactBaseUrl;
    return this._http.post<Contact>(contactUrl ,contact );
    }

  public getListeContactObservable():Observable<Contact[]>{
      let  contactUrl : string = this._contactBaseUrl ;
      return this._http.get<Contact[]>(contactUrl );
  }

  public deleteContactServerSide(contactId):Observable<any>{
    console.log("deleting contact of _id = " + contactId );
    let  deleteContactUrl : string = this._contactBaseUrl + "/"  + contactId;
    console.log("deleteContactUrl= " + deleteContactUrl );
    return this._http.delete(deleteContactUrl );
   }

}

/*

"http://localhost:8282/flow-des-mots/contact" 
"http://le-flow-des-mots.fr/flow-des-mots/contact"
	
*/
