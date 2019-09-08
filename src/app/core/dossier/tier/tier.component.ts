import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TierService} from "../service/tier.service";
import {Tier} from "../model/tier.model";
import {tap, mergeMap} from "rxjs/internal/operators";
import {TierPm} from "../model/tier-pm.model";
import {of} from "rxjs";

@Component({
  selector: 'app-tier',
  templateUrl: './tier.component.html',
  styleUrls: ['./tier.component.css']
})
export class TierComponent implements OnInit {

  isHiddenNumPm: boolean = true;

  @Input()
  parentForm: FormGroup;
  @Output()
  idGrcSelected: EventEmitter<string> = new EventEmitter<string>();
  tier: Tier;

  constructor(private tierService: TierService,) {
  }

  ngOnInit() {

    //récupérer le num de PM suite au changement type de Tier
    this.displayNumPM();

    this.buildNumPM();

    this.typeTier.valueChanges.subscribe((valueTypeTier: string) => {
      console.log('valueTypeTier')
      this.resetTierValueForm();

    })
  }

  resetTierValueForm(): void {
    this.numPm.setValue('');
    this.idGrc.setValue('');
  }

  displayNumPM(): void {
    console.log('displayNumPM');
    this.typeTier.valueChanges.subscribe(typeVal => {
      console.log('displayNumPM : ', typeVal);
      if (typeVal === 'pm') {
        this.isHiddenNumPm = false;
      } else {
        this.isHiddenNumPm = true;
        this.numPm.setValue('');
      }
    });
  }

  buildNumPM(): void {
    this.idGrc.valueChanges.subscribe((idGrcValue: string) => {
      if (this.idGrc.value.length === 7) {
        this.tierService.getTierByIdGrc(idGrcValue, this.typeTier.value)
          .pipe(
            tap((tier: Tier) => console.log('Tier in check', tier)),
            mergeMap((tier: Tier) => {
              this.tier = tier;
              if (tier) {
                console.log('#### 1 ', tier)
                this.idGrcSelected.emit(tier.idGrc);
                return this.tierService.getNumPmByIdGrc(tier.idGrc);
              } else {
                console.log('#### 2 ', tier);
                this.idGrcSelected.emit(undefined);
                return of(undefined);
              }
            })
          ).subscribe((tierPm: TierPm) => {
          if (tierPm) {
            this.numPm.setValue(tierPm.numPm);
          }
        });
      }
    })
  }

  get idGrc() {
    return this.parentForm.get('idGrc');
  }

  get typeTier() {
    return this.parentForm.get('typeTier');
  }

  get numPm() {
    return this.parentForm.get('numPm');
  }

}
