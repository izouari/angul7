import {Component, OnInit} from '@angular/core';
import {Dossier} from "./model/dossier";
import {DossierService} from "./service/dossier.service";
import {DossierEventService} from "./service/dossier-event.service";
import {StatusCase} from "./model/status-case";
import {SensOperation} from "./model/sens-operation.model";

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html'
})
export class DossierComponent implements OnInit{

  dossier: Dossier;

  constructor(private dossierService: DossierService,
              private dossierEventService: DossierEventService) {
  }

  ngOnInit() {

    console.log('••••••• DossierComponent init');

    this.dossierEventService.dossierLoaded.subscribe(
      dossier => {
        console.log('••••••• DossierComponent loaded case ', dossier);
        this.dossier = dossier;
      }
    )
  }
}
