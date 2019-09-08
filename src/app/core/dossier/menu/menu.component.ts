import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {MenuService, MenuData} from "../service/menu.service";
import {Dossier} from "../model/dossier";
import {Router, Event} from "@angular/router";
import {MenuAction} from "../model/menu-action";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/*
En regardant les Logs la fonction isDisable() est executée plusieurs fois (en Total 6 fois:
  pour chaque route(/demande, /traitement, /decision) elle est  executée 2 fois )
  ceci est du au fait que le router envoie des events (pour le consulter rajouter dans le module
  app-routing.module.ts  { enableTracing: true }) donc on a 2 fois un event de type NavigationStart
  pour eviter le chargement de menu, on rajoute ChangeDetectorRef :

  1- Dans le constructor on detach le component pour qu'il n'execute aucun evenement this.cd.detach();

  2- Dans l'observable  this.menuService.menuState.subscribe et apres avoir recu le menuList, on lance la detection
     de changement par  this.cd.detectChanges();

  3- Dans toAccueil, vu que la valeur de enabledMenuList a été changée il faut activer le changement avec this.cd.detectChanges();
     a chaque fois on active le changement, la fonction isDisable est appeleé


   Deuxieme solution, changer la strategy de detection

   //To see : https://alligator.io/angular/change-detection-strategy/
    https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4

   1-changeDetection: ChangeDetectionStrategy.OnPush : dans ce cas angular désactive le change detection dans le component
   pour réactiver ce change detection il faut que la valeur qu'on passe au componenet change de reference

   ou bien activer ce change detection explicitement en utilisant ChangeDetectorRef

   2- Dans l'observable  this.menuService.menuState.subscribe et apres avoir recu le menuList, on lance la detection
      de changement par  this.cd.detectChanges();

   3- Dans toAccueil, on a plus besoin de faire this.cd.detectChanges();, vu que la valeur de enabledMenuList change
      de reference;


 */

export class MenuComponent implements OnInit {

  dossier: Dossier;
  enabledMenuList: MenuAction [];

  constructor(private menuService: MenuService, private router: Router, private cd: ChangeDetectorRef) {
   // this.cd.detach();
  }

  ngOnInit() {

    console.log('Init Menu component');

    this.router.events.subscribe((routerEvent: Event) => console.log("RouterEvent type {%s} ", routerEvent));



     this.menuService.menuState.subscribe((menuData: MenuData) => {
     this.dossier = menuData.dossier;
     console.log('Menu State form menuComponent', menuData);

     this.enabledMenuList = menuData.enabledMenuList;
     this.cd.detectChanges();

     })


  }

  isDisable(menu: MenuAction) {
    console.log("call to isDisable methode , value of this.enabledMenuList: ", this.enabledMenuList);

    if(this.enabledMenuList === undefined
      || this.enabledMenuList === null
      || !this.enabledMenuList.includes(menu)) {
      return true;
    }
    return false;
  }

  toAccueil() {

    this.router.navigate(['/accueil']);
    this.enabledMenuList = null;
   // this.cd.detectChanges();
    console.log("toAccueil")
  }

}
