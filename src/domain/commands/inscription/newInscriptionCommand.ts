export class NewInscriptionCommand {
  projectID: string;
  uidUser: string;

  constructor(projectID: string, uidUser: string) {
    this.projectID = projectID;
    this.uidUser = uidUser;
  }
}
