import { Component, OnInit } from '@angular/core';
import {DossierEventService} from "../service/dossier-event.service";
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from "@angular/forms";
import {DossierService} from "../service/dossier.service";

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.css']
})
export class TraitementComponent implements OnInit {

  traitementForm: FormGroup;

  constructor(private dossierService: DossierService,
              private dossierEventService: DossierEventService,
              private fb: FormBuilder) { }

  ngOnInit() {

    console.log('Init Traitement compo');

    this.createDemandeForm();
    this.initForm();
  }

  createDemandeForm(): void {
    this.traitementForm = this.fb.group({
      id: ['', Validators.required],
      montant: ['', Validators.required],
      status: [''],
      sensOperation: ['']
    })
  }

  initForm(): void {
    this.dossierEventService.dossierLoaded.subscribe(
      dossier => {
        this.traitementForm.patchValue({
          id: dossier.id,
          montant: dossier.montant,
          status: dossier.status,
          sensOperation: dossier.sensOperation
        })
      }
    );
  }

  get id(): AbstractControl {
    return this.traitementForm.get('id');
  }

  valider(): void {
    console.log('this.traitementForm.value : ', this.traitementForm.value);
    this.dossierService.save(this.traitementForm.value);

    this.dossierService.getCaseById(this.id.value).subscribe(dossier => {
      console.log('Traitement get dossier after loaded ', dossier)
      console.log("saveDossierToShare after traitement validation: ", dossier);
      this.dossierEventService.saveDossierToShare(dossier);
    });

  }
}
