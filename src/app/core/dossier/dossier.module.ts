import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemandeComponent} from "./demande/demande.component";
import {TraitementComponent} from "./traitement/traitement.component";
import {DecisionComponent} from "./decision/decision.component";
import {BandeauInformationComponent} from "./bandeau-information/bandeau-information.component";
import {DossierRoutingModule} from "./dossier-routing.module";
import {MenuGuard} from "./share/menu.guard";
import {CommonModule} from "@angular/common";
import {DossierComponent} from "./dossier.component";


@NgModule({
  declarations: [
    DemandeComponent,
    TraitementComponent,
    DecisionComponent,
    BandeauInformationComponent,
    DossierComponent
  ],
  imports: [
    CommonModule,
    DossierRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MenuGuard]
})
export class DossierModule { }
