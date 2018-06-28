import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Input } from "@angular/core";
import { ViewChild } from "@angular/core";

@Component({
  selector: 'bsu-modal',
  templateUrl: './bsu-modal.component.html',
  styleUrls: ['./bsu-modal.component.css']
})
export class BsuModalComponent implements OnInit {

  @Input()
  title : string ="default modal title";

  @Input()
  innerHtmlText : string ="default modal <b>content</b>";

  
    constructor(private modalService: NgbModal) {}

    @ViewChild('content') //<ng-template #content ...>
    thisContent : any ;

    public openThisContext() {
      let options : object = null;
      //console.log("length="+this.innerHtmlText.length);
      if(this.innerHtmlText && this.innerHtmlText.length > 400){
        options = {  size: 'lg' };
      }
      else{
        options = {  size: 'sm' };
      }

      this.modalService.open(this.thisContent , options   );
    }

    open(content) {
      this.modalService.open(content);
    }
  
    /*
    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    */
  

  ngOnInit() {
  }

}
