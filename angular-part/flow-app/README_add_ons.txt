npm install bootstrap@4.1.1 --save
npm install font-awesome@4.7.0 --save
npm install --save @ng-bootstrap/ng-bootstrap
=========
NB: @ng-bootstrap/ng-bootstrap in a good bootstrap4 integration in angular , no need of jQuery...js , no need of popper.js
documentation at this URL : https://ng-bootstrap.github.io/#/home
=========
dans .angular.json :

"styles": [
  "src/styles.css" , 
 
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
  
           "node_modules/font-awesome/css/font-awesome.min.css"
      
  ],
=====
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

imports: [
     NgbModule.forRoot() , .... ] in main app.module.ts
or imports: [
     NgbModule , .... ] in others ....module.ts
======