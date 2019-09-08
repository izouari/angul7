import {Component, OnInit, Input} from '@angular/core';
import {Dossier} from "../model/dossier";

@Component({
  selector: 'app-bandeau-information',
  templateUrl: './bandeau-information.component.html',
  styleUrls: ['./bandeau-information.component.css']
})
export class BandeauInformationComponent implements OnInit {

  @Input()
  dossier: Dossier;

  constructor() {
    console.log('Bandeau Info constrcutor', this.dossier);
  }

  ngOnInit() {
    console.log('Bandeau Info init ', this.dossier);
  }

}
