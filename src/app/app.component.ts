import {Component, OnInit} from '@angular/core';
import {DossierService} from "./core/dossier/service/dossier.service";
import {DossierEventService} from "./core/dossier/service/dossier-event.service";
import {Dossier} from "./core/dossier/model/dossier";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  dossierLoaded: Dossier

  constructor(private dossierService: DossierService,
              private dossierEventService: DossierEventService) {
  }

  title = 'recflux-project';

  ngOnInit() {

    console.log('••••••• app component init');

    
  }
}
