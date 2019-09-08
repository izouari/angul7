import {Component, OnInit, ViewChild} from '@angular/core';
import {DossierService} from "../service/dossier.service";
import {Dossier} from "../model/dossier";
import {Router} from "@angular/router";
import {MatTableDataSource, MatDialog} from "@angular/material";
import {StatusCase} from "../model/status-case";
import {CreateDossierComponent} from "../../../create-dossier/create-dossier.component";
import {SearchDossierComponent} from "../search-dossier/search-dossier.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  dossiers: Dossier[];
  displayedColumns: string[] = ['NumDoss', 'Status', 'sensOp', 'montant'];
  dataSource;

  @ViewChild('refSearch')
  searchDossierComponent: SearchDossierComponent;


  constructor(private dossierService: DossierService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    console.log('Init Accueil component');

    //Get All Cases
    this.getAllCases();

  }

  getAllCases() {
    this.dossierService.getAllCase().subscribe(cases => {
      this.dossiers = cases;
      this.dataSource = new MatTableDataSource(this.dossiers);
    })
  }

  openDossier(dossier: Dossier) {
    const path = this.buildRoutePath(dossier.status);
    this.router.navigate([path, dossier.id]);
  }

  buildRoutePath(status: StatusCase): string {
    switch (status) {
      case StatusCase.CREATED: {
        return '/dossier/demande'
      }
      case StatusCase.TRAITEMENT: {
        return '/dossier/traitement'
      }
      case StatusCase.DECISION: {
        return '/dossier/decision'
      }
      default: {
        console.log('Wrong Status');
        break;
      }
    }
  }

  createDossier(): void {
    console.log("this.searchDossierComponent : ", this.searchDossierComponent.tier);
    const dialogRef = this.dialog.open(CreateDossierComponent, {
      width: '450px',
      height: '300px',
      data: {id: 'idTest', status: 'statusTest'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
