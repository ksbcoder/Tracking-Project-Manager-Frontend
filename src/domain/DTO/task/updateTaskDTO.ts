import { Priority, StateTask } from 'src/base/utils/enums';

export class UpdateTaskDTO {
  taskID: number;
  projectID: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  createdAt: Date;
  assignedAt: Date;
  deadline: Date;
  completedAt: Date;
  priority: Priority;
  stateTask: StateTask;

  constructor(
    taskID: number,
    projectID: string,
    description: string,
    createdBy: string,
    assignedTo: string,
    createdAt: Date,
    assignedAt: Date,
    deadline: Date,
    completedAt: Date,
    priority: Priority,
    stateTask: StateTask
  ) {
    this.taskID = taskID;
    this.projectID = projectID;
    this.description = description;
    this.createdBy = createdBy;
    this.assignedTo = assignedTo;
    this.createdAt = createdAt;
    this.assignedAt = assignedAt;
    this.deadline = deadline;
    this.completedAt = completedAt;
    this.priority = priority;
    this.stateTask = stateTask;
  }
}
