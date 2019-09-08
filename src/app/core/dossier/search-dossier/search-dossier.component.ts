import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TierService} from "../service/tier.service";
import {Tier} from "../model/tier.model";
import {TierPm} from "../model/tier-pm.model";
import {tap, mergeMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-search-dossier',
  templateUrl: './search-dossier.component.html',
  styleUrls: ['./search-dossier.component.css']
})
export class SearchDossierComponent implements OnInit {

  searchForm: FormGroup;
  isHiddenNumPm: boolean = true;
  tier: Tier;

  constructor(private fb: FormBuilder,
              private tierService: TierService,
              private router: Router) {
  }

  ngOnInit() {
    this.createSearchForm();


    this.typeTier.valueChanges.subscribe(typeVal => {
      console.log('type changes ', typeVal);
      if (typeVal === 'pm') {
        this.isHiddenNumPm = false;
        if (this.idGrc.value.length === 7) {
          console.log('11111  ', typeVal);
          this.tierService.getTierByIdGrc(this.idGrc.value, this.typeTier.value)
            .pipe(
              tap((tier:Tier) => console.log('Tier in check ## ', tier)),
              mergeMap((tier:Tier) => {
                  this.tier = tier;
                  return this.tierService.getNumPmByIdGrc(tier.idGrc);
              })
            ).subscribe((tierPm: TierPm) => {
            if (tierPm) {
              console.log('Tier PM in check', tierPm);
              this.numPm.setValue(tierPm.numPm);
            }
          });
        }
      } else {
        this.isHiddenNumPm = true;
        this.numPm.setValue('');
      }

    });

    //Chargement des num Pm, et Vérification de la validity de Tier

    this.idGrc.valueChanges.subscribe((idGrcValue: string) => {

      console.log('########### ', this.typeTier);
      if (this.idGrc.value.length === 7) {
        console.log('To call check ', this.typeTier);
        let isValidTier = this.checkValidityTier();

        if (this.typeTier.value === 'pm' && isValidTier) {
          this.getNumPmByIdGrc(idGrcValue);
        }

      }
    });
  }

  createSearchForm(): void {
    this.searchForm = this.fb.group({
      typeTier: ['', Validators.required],
      idGrc: ['', Validators.required],
      numPm: [''],
      refInter: []
    })
  }

  getNumPmByIdGrc(idGrc: string) {
    console.log("getNumPmByIdGrc •••• ", idGrc);
    this.tierService.getNumPmByIdGrc(idGrc)
      .subscribe((tierPm: TierPm) => {
        console.log("TierPM : ", tierPm);
        if (tierPm) {
          this.numPm.setValue(tierPm.numPm);
        } else {
          this.numPm.setValue('');
        }
      });

  }

  searchCase(): void {
    console.log('Recherche Lancée');


  }

  checkValidityTier(): Boolean {
    console.log('Check Validity Tier');
    this.tierService.getTierByIdGrc(this.idGrc.value, this.typeTier.value).subscribe((tier: Tier) => {
      if (tier) {
        console.log("Tier : ", tier);
        this.tier = tier;
        return true;
      } else {
        console.log("Tier Non trouvé pour {%s} : ", this.idGrc.value);
        return false;
      }
    });
    return true;
  }

  get idGrc() {
    return this.searchForm.get('idGrc');
  }

  get typeTier() {
    return this.searchForm.get('typeTier');
  }

  get numPm() {
    return this.searchForm.get('numPm');
  }

  get refInter() {
    return this.searchForm.get('refInter');
  }


}
