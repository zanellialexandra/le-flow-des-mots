import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'bsu-carousel',
  templateUrl: './bsu-carousel.component.html',
  styleUrls: ['./bsu-carousel.component.css']
})
export class BsuCarouselComponent implements OnInit {


  @Input()
  carouselDefs=[
     { label:"" , imagePath:"" , path:""}
  ];
 
   
  constructor() { }

  ngOnInit() {
  }

}
