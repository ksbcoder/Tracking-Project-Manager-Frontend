import { StateInscription } from 'src/base/utils/enums';

export class InscriptionRespondedDTO {
  projectID: string;
  uidUser: string;
  createdAt: Date;
  responsedAt: Date;
  stateInscription: StateInscription;

  constructor(
    projectID: string,
    uidUser: string,
    createdAt: Date,
    responsedAt: Date,
    stateInscription: StateInscription
  ) {
    this.projectID = projectID;
    this.uidUser = uidUser;
    this.createdAt = createdAt;
    this.responsedAt = responsedAt;
    this.stateInscription = stateInscription;
  }
}
