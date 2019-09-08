import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Dossier} from "../model/dossier";

@Injectable({
  providedIn: 'root'
})
export class DossierEventService {

  protected dossierLoad: BehaviorSubject<Dossier> = new BehaviorSubject<Dossier>(null);

  dossierLoaded = this.dossierLoad.asObservable();

  constructor() { }

  saveDossierToShare(dossier: Dossier) {
    this.dossierLoad.next(dossier);
  }


}
