import { StateProject } from 'src/base/utils/enums';

export class UpdateProjectCommand {
  leaderID: string;
  name: string;
  description: string;
  deadLine: Date;
  stateProject: StateProject;

  constructor(
    leaderID: string,
    name: string,
    description: string,
    deadLine: Date,
    stateProject: StateProject
  ) {
    this.leaderID = leaderID;
    this.name = name;
    this.description = description;
    this.deadLine = deadLine;
    this.stateProject = stateProject;
  }
}
