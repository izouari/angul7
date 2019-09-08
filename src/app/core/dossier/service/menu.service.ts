import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Dossier} from "../model/dossier";
import {MenuAction} from "../model/menu-action";


export class MenuData {
  constructor(public dossier: Dossier, public enabledMenuList: MenuAction []){}

}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  protected menuStateSource: BehaviorSubject<MenuData> = new BehaviorSubject<MenuData>(new MenuData(null, null));

  menuState = this.menuStateSource.asObservable();

  constructor() { }

  changeMenuState(data: MenuData) {
    this.menuStateSource.next(data);
  }
}
