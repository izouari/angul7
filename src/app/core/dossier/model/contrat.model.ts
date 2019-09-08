export class Contrat {

  constructor(public idGrc: string, public listCnt: contratStructure[]) {

  }
}


class contratStructure {

  constructor(public id: string, public type: string) {

  }
}
