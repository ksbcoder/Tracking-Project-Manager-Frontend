import { Observable } from 'rxjs';
import { NewTaskDTO } from 'src/domain/DTO/task/newTaskDTO';
import { UpdateTaskDTO } from 'src/domain/DTO/task/updateTaskDTO';
import { NewTaskCommand } from 'src/domain/commands/task/newTaskCommand';
import { UpdateTaskCommand } from 'src/domain/commands/task/updateTaskCommand';
import { TaskModel } from 'src/domain/models/task/task.model';

export abstract class TaskRepository {
  abstract createTaskAsync(task: NewTaskCommand): Observable<NewTaskDTO>;

  abstract deleteTaskAsync(idTask: number): Observable<UpdateTaskDTO>;

  abstract getTaskByIdAsync(idTask: number): Observable<TaskModel>;

  abstract getAllTasksAsync(): Observable<TaskModel[]>;

  abstract getUnassignedTasksAsync(idLeader: string): Observable<TaskModel[]>;

  abstract getTasksByUserIdAsync(idUser: string): Observable<TaskModel[]>;

  abstract updateTaskAsync(params: {
    idTask: number;
    task: UpdateTaskCommand;
  }): Observable<UpdateTaskDTO>;

  abstract assignTaskAsync(params: {
    idTask: number;
    uidUser: string;
  }): Observable<UpdateTaskDTO>;

  abstract completeTaskAsync(idTask: number): Observable<UpdateTaskDTO>;
}
