import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ContratService} from "../core/dossier/service/contrat.service";
import {Contrat} from "../core/dossier/model/contrat.model";

@Component({
  selector: 'app-create-dossier',
  templateUrl: './create-dossier.component.html',
  styleUrls: ['./create-dossier.component.css']
})
export class CreateDossierComponent implements OnInit {

  createForm: FormGroup;
  contrat: Contrat;
  status_values: any = ["In Progress", "Completed", "Closed"];

  constructor(
    public dialogRef: MatDialogRef<CreateDossierComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private contratService: ContratService) {}

  onNoClick(): void {
    console.log("No Click ###")
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log("DAtA : ", this.data);
    this.creatForm();


  }


  creatForm(): void {
    this.createForm = this.fb.group({
      typeTier: ['', Validators.required],
      idGrc: ['', [Validators.required, Validators.minLength(7)]],
      numPm: [''],
      contract: [''],
    })
  }

  getContratByIdGrc(idGrc: string) {
    console.log('getContratByIdGrc 1 : ', idGrc);
    if (idGrc) {
      this.contratService.getContratByIdGrc(idGrc)
        .subscribe((contrat: Contrat) => {
          console.log('List Contarts : ', contrat);
          this.contrat = contrat;
        });
    }
  }


  validerDossier(): void {
    console.log('valider doss', this.createForm);
  }

  get contract() {
    return this.createForm.get('contract');
  }
}
