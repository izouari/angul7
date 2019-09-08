import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tier} from "../model/tier.model";
import {filter, tap, map} from "rxjs/internal/operators";
import {flatMap} from "tslint/lib/utils";
import {TierPm} from "../model/tier-pm.model";

@Injectable({
  providedIn: 'root'
})
export class TierService {

  private _url = '/assets/tier.json';

  private _urlPM = '/assets/tierPM.json';

  constructor(private http: HttpClient) {
  }

  getTierByIdGrc(idGrc: string, typeTier: string): Observable<Tier> {
    console.log('TierService  ==> getTierByIdGrc {%s} type {%s}', idGrc, idGrc);
    return this.http.get<Tier[]>(this._url)
      .pipe(
        map((listTier: Tier[]) => listTier.filter((tier: Tier) => {
          return tier.idGrc === idGrc && tier.typeTier === typeTier;
        })[0]),
      );
  }

  getNumPmByIdGrc(idGrc: string): Observable<TierPm> {
    return this.http.get<TierPm[]>(this._urlPM)
      .pipe(
        map((tiersPmList: TierPm[]) => tiersPmList.filter((tierPm: TierPm) => tierPm.idGrc === idGrc)[0])
      );
  }


}
