import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemandeComponent} from "./core/dossier/demande/demande.component";
import {TraitementComponent} from "./core/dossier/traitement/traitement.component";
import {DecisionComponent} from "./core/dossier/decision/decision.component";
import {AccueilComponent} from "./core/dossier/accueil/accueil.component";
import {MenuGuard} from "./core/dossier/share/menu.guard";
import {StatusCase} from "./core/dossier/model/status-case";

const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {
    path: 'accueil',
    component: AccueilComponent
  },
  {
    path: 'dossier',
    loadChildren: './core/dossier/dossier.module#DossierModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
