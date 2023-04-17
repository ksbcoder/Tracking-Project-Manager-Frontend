import { StateInscription } from 'src/base/utils/enums';

export class InscriptionModel {
  inscriptionID: string;
  projectID: string;
  uidUser: string;
  createdAt: Date;
  responsedAt: Date;
  stateInscription: StateInscription;

  constructor(
    inscriptionID: string,
    projectID: string,
    uidUser: string,
    createdAt: Date,
    responsedAt: Date,
    stateInscription: StateInscription
  ) {
    this.inscriptionID = inscriptionID;
    this.projectID = projectID;
    this.uidUser = uidUser;
    this.createdAt = createdAt;
    this.responsedAt = responsedAt;
    this.stateInscription = stateInscription;
  }
}
