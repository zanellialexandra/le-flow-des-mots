import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'bsu-overview-card',
  templateUrl: './bsu-overview-card.component.html',
  styleUrls: ['./bsu-overview-card.component.css']
})
export class BsuOverviewCardComponent implements OnInit {

  @Input()
  title : string = "default card title";

  @Input()
  smallInnerHtmlText : string = "default card content text";

  @Input()
  bigModalInnerHtmlText : string = "big html";

  @Input()
  footer : string = null; //"default optional card footer text";

  constructor() { }

  ngOnInit() {
  }

}
