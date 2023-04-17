export class NewProjectCommand {
  leaderID: string;
  name: string;
  description: string;

  constructor(leaderID: string, name: string, description: string) {
    this.leaderID = leaderID;
    this.name = name;
    this.description = description;
  }
}
