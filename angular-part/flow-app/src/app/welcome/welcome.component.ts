import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  carouselDefs : object[] =[
    { label:null , imagePath:"./images/recitDeVie.jpeg" , path:"/biographie_recitVie"},
    { label:null , imagePath:"./images/atelierEcriture.jpeg" , path:"/atelier_ecriture"},
    { label:null , imagePath:"./images/ADMINISTRATION.jpeg" , path:"/administratif"}
 ];


 constructor() { }
 
   ngOnInit() {
   }
 

}
