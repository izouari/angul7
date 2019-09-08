import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DemandeComponent} from "./demande/demande.component";
import {StatusCase} from "./model/status-case";
import {MenuGuard} from "./share/menu.guard";
import {TraitementComponent} from "./traitement/traitement.component";
import {DecisionComponent} from "./decision/decision.component";
import {DossierComponent} from "./dossier.component";

const routes: Routes = [

  {
    path: '',
    component: DossierComponent,
    children: [
      {
        path: 'demande/:id',
        component: DemandeComponent,
        data: {
          statusAutorized: [StatusCase.CREATED, StatusCase.TRAITEMENT, StatusCase.DECISION],
          titlePage: 'Demande'
        },
        canActivate: [MenuGuard]
      },
      {
        path: 'traitement/:id',
        component: TraitementComponent,
        data: {
          statusAutorized: [StatusCase.TRAITEMENT, StatusCase.DECISION],
          titlePage: 'Traitement'
        },
        canActivate: [MenuGuard]
      },
      {
        path: 'decision/:id',
        component: DecisionComponent,
        data: {
          statusAutorized: [StatusCase.DECISION],
          titlePage: 'Decision'
        },
        canActivate: [MenuGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierRoutingModule {
}
