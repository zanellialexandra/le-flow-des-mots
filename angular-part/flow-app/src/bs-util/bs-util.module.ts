import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BsuTogglePanelComponent } from "src/bs-util/bsu-toggle-panel/bsu-toggle-panel.component";
import { BsuMyFormGroupWithLabelComponent } from "src/bs-util/bsu-my-form-group-with-label/bsu-my-form-group-with-label.component";
import { BsuNavBarComponent } from "src/bs-util/bsu-nav-bar/bsu-nav-bar.component";
import { BsuNavItemComponent } from "src/bs-util/bsu-nav-item/bsu-nav-item.component";
import { BsuDropdownMenuComponent } from "src/bs-util/bsu-dropdown-menu/bsu-dropdown-menu.component";
import { BsuCarouselComponent } from "src/bs-util/bsu-carousel/bsu-carousel.component";
import { BsuOverviewCardComponent } from './bsu-overview-card/bsu-overview-card.component';
import { BsuModalComponent } from './bsu-modal/bsu-modal.component';
import { DirectivesModule } from "../directives/directives.module";

@NgModule({
  imports: [
    CommonModule , FormsModule , RouterModule , NgbModule , DirectivesModule
  ],
  exports: [
    BsuTogglePanelComponent,
    BsuMyFormGroupWithLabelComponent , BsuNavBarComponent , BsuCarouselComponent , 
    BsuOverviewCardComponent , BsuModalComponent
  ],
  declarations: [ BsuTogglePanelComponent,
    BsuMyFormGroupWithLabelComponent , BsuNavBarComponent , BsuCarouselComponent ,
    BsuDropdownMenuComponent ,  BsuNavItemComponent, BsuOverviewCardComponent ,BsuModalComponent
  ]
})
export class BsUtilModule { }
