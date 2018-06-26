import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MyHeaderComponent } from './my-header/my-header.component';
import { MyFooterComponent } from './my-footer/my-footer.component';
import { FormsModule } from "@angular/forms";
import { WelcomeComponent } from './welcome/welcome.component';
import { BsUtilModule } from "src/bs-util/bs-util.module";
import { PresentationAlexandraComponent } from './presentation-alexandra/presentation-alexandra.component';
import { ContactComponent } from './contact/contact.component';
import { FlorilegeComponent } from './florilege/florilege.component';
import { BiographieComponent } from './biographie/biographie.component';
import { AtelierEcritureComponent } from './atelier-ecriture/atelier-ecriture.component';
import { TarifsComponent } from './tarifs/tarifs.component';
import { AdministratifComponent } from './administratif/administratif.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';





const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'florilege', component: FlorilegeComponent },
  { path: 'tarifs', component: TarifsComponent },
  { path: 'atelier_ecriture', component: AtelierEcritureComponent },
  { path: 'biographie_recitVie', component: BiographieComponent },
  { path: 'administratif', component: AdministratifComponent },
  { path: 'pres_alexandra', component: PresentationAlexandraComponent },
  { path: 'admin_contact', component: AdminContactComponent },
  { path: 'admin_publication', component: AdminPostComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyFooterComponent,
    WelcomeComponent,
    PresentationAlexandraComponent,
    ContactComponent,
    FlorilegeComponent,
    BiographieComponent,
    AtelierEcritureComponent,
    TarifsComponent,
    AdministratifComponent,
    AdminPostComponent,
    AdminContactComponent
  ],
  imports: [
    BrowserModule , FormsModule, BsUtilModule, NgbModule.forRoot() ,
     RouterModule.forRoot(routes) , HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
