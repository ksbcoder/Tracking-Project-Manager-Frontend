import { Priority } from 'src/base/utils/enums';

export class UpdateTaskCommand {
  projectID: string;
  description: string;
  assignedTo: string;
  assignedAt: Date;
  deadline: Date;
  priority: Priority;

  constructor(
    projectID: string,
    description: string,
    assignedTo: string,
    assignedAt: Date,
    deadline: Date,
    priority: Priority
  ) {
    this.projectID = projectID;
    this.description = description;
    this.assignedTo = assignedTo;
    this.assignedAt = assignedAt;
    this.deadline = deadline;
    this.priority = priority;
  }
}
