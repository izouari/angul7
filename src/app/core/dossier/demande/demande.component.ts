import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DossierEventService} from "../service/dossier-event.service";

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  demandeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private dossierEventService: DossierEventService) { }

  ngOnInit() {

    console.log('Init Demande compo');

    this.createDemandeForm();
    this.initForm();
  }

  createDemandeForm(): void {
    this.demandeForm = this.fb.group({
      id: ['', Validators.required],
      montant: ['', Validators.required],
    })
  }

  initForm(): void {

    this.dossierEventService.dossierLoaded.subscribe(
      dossier => {
        this.demandeForm.patchValue({
          id: dossier.id,
          montant: dossier.montant,
          status: dossier.status,
          sensOperation: dossier.sensOperation
        })
      }
    );
  }

}
