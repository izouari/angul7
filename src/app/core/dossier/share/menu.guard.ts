import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DossierService} from "../service/dossier.service";
import {MenuService, MenuData} from "../service/menu.service";
import {StatusCase} from "../model/status-case";
import {MenuAction} from "../model/menu-action";
import {DossierEventService} from "../service/dossier-event.service";

@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {


  constructor(private dossierService: DossierService,
              private router: Router,
              private menuService: MenuService,
              private dossierEventService: DossierEventService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const {statusAutorized} = route.data;

    console.log("Only Autorized status is : ", statusAutorized);

    const caseId = route.paramMap.get('id');

    console.log("Get caseId from Menu : ", caseId);

    this.dossierService.getCaseById(caseId).subscribe((dossier) => {
      const {status} = dossier;
      console.log("Currently status is : ", status);
      if (!statusAutorized.includes(status)) {
        console.log("the Status {%s} is not autorized to access", status);
        return false;
      }

      console.log("the Status {%s} is  autorized to access", status);
      this.menuService.changeMenuState(new MenuData(dossier, this.getEnabledMenu(status)));

      console.log("saveDossierToShare : ", dossier);
      this.dossierEventService.saveDossierToShare(dossier);
    });

    return true;
  }

  getEnabledMenu(status: StatusCase): MenuAction [] {

    switch (status) {
      case StatusCase.CREATED: {
        return [MenuAction.DEMANDE];
        break;
      }
      case StatusCase.TRAITEMENT: {
        return [MenuAction.DEMANDE, MenuAction.TRAITEMENT];
        break;
      }
      case StatusCase.DECISION: {
        return [MenuAction.DEMANDE, MenuAction.TRAITEMENT, MenuAction.DECISION];
        break;
      }
      default: {
        console.log("Aucun menu ne sera activé", status);
        return [];
        break;
      }

    }
  }

}
