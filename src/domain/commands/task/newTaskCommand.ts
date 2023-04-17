import { Priority } from 'src/base/utils/enums';

export class NewTaskCommand {
  projectID: string;
  description: string;
  createdBy: string;
  deadline: Date;
  priority: Priority;

  constructor(
    projectID: string,
    description: string,
    createdBy: string,
    deadline: Date,
    priority: Priority
  ) {
    this.projectID = projectID;
    this.description = description;
    this.createdBy = createdBy;
    this.deadline = deadline;
    this.priority = priority;
  }
}
