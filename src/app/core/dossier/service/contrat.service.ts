import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contrat} from "../model/contrat.model";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private _url = '/assets/contrat.json'

  constructor(private http: HttpClient) { }

  getAllContrat(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(this._url);
  }

  getContratByIdGrc(idGrc: string): Observable<Contrat> {
    console.log('getContratByIdGrc : ', idGrc);
   return this.getAllContrat()
     .pipe(
       map((contrats: Contrat[]) => contrats.filter((contrat: Contrat) => contrat.idGrc === idGrc)[0])
     )
  }
}
