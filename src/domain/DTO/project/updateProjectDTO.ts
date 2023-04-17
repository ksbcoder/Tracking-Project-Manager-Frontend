import { Phase, StateProject } from 'src/base/utils/enums';

export class UpdateProjectDTO {
  projectID: string;
  leaderID: string;
  name: string;
  description: string;
  createdAt: Date;
  openDate: Date;
  deadLine: Date;
  completedAt: Date;
  efficiencyRate: number;
  phase: Phase;
  stateProject: StateProject;

  constructor(
    projectID: string,
    leaderID: string,
    name: string,
    description: string,
    createdAt: Date,
    openDate: Date,
    deadLine: Date,
    completedAt: Date,
    efficiencyRate: number,
    phase: Phase,
    stateProject: StateProject
  ) {
    this.projectID = projectID;
    this.leaderID = leaderID;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.openDate = openDate;
    this.deadLine = deadLine;
    this.completedAt = completedAt;
    this.efficiencyRate = efficiencyRate;
    this.phase = phase;
    this.stateProject = stateProject;
  }
}
