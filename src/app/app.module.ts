import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AccueilComponent} from "./core/dossier/accueil/accueil.component";
import {MenuComponent} from "./core/dossier/menu/menu.component";
import {MenuGuard} from "./core/dossier/share/menu.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule
} from "@angular/material";
import {CreateDossierComponent} from "./create-dossier/create-dossier.component";
import {SearchDossierComponent} from "./core/dossier/search-dossier/search-dossier.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TierComponent} from "./core/dossier/tier/tier.component";


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MenuComponent,
    CreateDossierComponent,
    SearchDossierComponent,
    TierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  entryComponents: [
    CreateDossierComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
