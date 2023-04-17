import { StateInscription } from 'src/base/utils/enums';

export class NewInscriptionDTO {
  projectID: string;
  uidUser: string;
  createdAt: Date;
  stateInscription: StateInscription;

  constructor(
    projectID: string,
    uidUser: string,
    createdAt: Date,
    stateInscription: StateInscription
  ) {
    this.projectID = projectID;
    this.uidUser = uidUser;
    this.createdAt = createdAt;
    this.stateInscription = stateInscription;
  }
}
