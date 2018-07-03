import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  carouselDefs : object[] =[
    { label:null , imagePath:"./images/recitDeVie.jpeg" , path:"/ngr/biographie_recitVie"},
    { label:null , imagePath:"./images/atelierEcriture.jpeg" , path:"/ngr/atelier_ecriture"},
    { label:null , imagePath:"./images/ADMINISTRATION.jpeg" , path:"/ngr/administratif"}
 ];


 constructor() { }
 
   ngOnInit() {
   }
 

}
