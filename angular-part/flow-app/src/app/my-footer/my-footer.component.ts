import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'my-footer',
  templateUrl: './my-footer.component.html',
  styleUrls: ['./my-footer.component.css']
})
export class MyFooterComponent implements OnInit {

  action : string;
  
  pseudo : string;

  validPseudo(): boolean {
    return (this.pseudo == "@lex@ndr@");
  }

  performNavigation(){
     let link = ['/ngr/'+this.action]; //ou link = ['/xx'] ; sans paramètre
     this._router.navigate( link );
  }

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
