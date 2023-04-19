export class NewCommentCommand {
  uidUser: string;
  projectID: string;
  description: string;

  constructor(uidUser: string, projectID: string, description: string) {
    this.uidUser = uidUser;
    this.projectID = projectID;
    this.description = description;
  }
}
