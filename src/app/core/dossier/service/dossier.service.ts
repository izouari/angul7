import {Injectable} from '@angular/core';
import {Dossier} from "../model/dossier";
import {Observable, of} from "rxjs";
import {SensOperation} from "../model/sens-operation.model";
import {StatusCase} from "../model/status-case";

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  dossiers = new Array<Dossier>();

  constructor() {
    console.log('constructor DossierService ', this.dossiers);
    this.dossiers.push(new Dossier('RCF1000', StatusCase.CREATED, SensOperation.EMIS, 1000));
    this.dossiers.push(new Dossier('RCF2000', StatusCase.TRAITEMENT, SensOperation.RECUS, 3000));
    this.dossiers.push(new Dossier('RCF3000', StatusCase.DECISION, SensOperation.RECUS, 5000));

  }

  getAllCase(): Observable<Dossier[]> {
    return of(this.dossiers);
  }

  getCaseById(caseId: string): Observable<Dossier> {
    console.log('getCaseById DossierService {%s} , {%s} ', caseId, this.dossiers);
    if (caseId == null || caseId == undefined) {
      console.log("caseId not valid");
      return;
    }

    if (caseId === 'RCF1000') {
      return of(this.dossiers[0]);

    } else if (caseId === 'RCF2000') {

      return of(this.dossiers[1]);

    } else if (caseId === 'RCF3000') {

      return of(this.dossiers[2]);
    }
  }

  save(dossierToSave: Dossier): void {
    let dossierDb:Dossier = this.dossiers.filter(dossier => dossier.id === dossierToSave.id)[0];
    this.dossiers[this.dossiers.indexOf(dossierDb)] = dossierToSave;

  }
}
