import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMatchSizeOfChildsDirective } from "../directives/my-match-size-of-childs.directive";

@NgModule({
  imports: [
    CommonModule 
  ],
  exports: [
  MyMatchSizeOfChildsDirective
  ],
  declarations: [ 
    MyMatchSizeOfChildsDirective
  ]
})
export class DirectivesModule { }
