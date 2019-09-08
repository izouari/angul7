import {SensOperation} from "./sens-operation.model";
import {StatusCase} from "./status-case";
export class Dossier {
  constructor(public id: string, public status: StatusCase, public sensOperation:SensOperation , public montant: number) {}

}
