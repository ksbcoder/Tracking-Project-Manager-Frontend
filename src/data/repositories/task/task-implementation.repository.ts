import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { NewTaskDTO } from 'src/domain/DTO/task/newTaskDTO';
import { UpdateTaskDTO } from 'src/domain/DTO/task/updateTaskDTO';
import { NewTaskCommand } from 'src/domain/commands/task/newTaskCommand';
import { UpdateTaskCommand } from 'src/domain/commands/task/updateTaskCommand';
import { TaskModel } from 'src/domain/models/task/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskImplementationRepository extends TaskRepository {
  constructor(private http: HttpClient) {
    super();
  }
  createTaskAsync(task: NewTaskCommand): Observable<NewTaskDTO> {
    return this.http.post<NewTaskDTO>(
      environment.urlApiProjects + 'Task',
      task
    );
  }
  deleteTaskAsync(idTask: number): Observable<UpdateTaskDTO> {
    return this.http.delete<UpdateTaskDTO>(
      environment.urlApiProjects + 'Task/ID?idTask=' + idTask
    );
  }
  getTaskByIdAsync(idTask: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(
      environment.urlApiProjects + 'Task/TaskID?idTask=' + idTask
    );
  }
  getAllTasksAsync(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(environment.urlApiProjects + 'Task/All');
  }
  getUnassignedTasksAsync(idLeader: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      environment.urlApiProjects + 'Task/Unassigned?idLeader=' + idLeader
    );
  }
  getTasksByUserIdAsync(idUser: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      environment.urlApiProjects + 'Task/UserID?uidUser=' + idUser
    );
  }
  updateTaskAsync(params: {
    idTask: number;
    task: UpdateTaskCommand;
  }): Observable<UpdateTaskDTO> {
    return this.http.put<UpdateTaskDTO>(
      environment.urlApiProjects + 'Task/ID?idTask=' + params.idTask,
      params.task
    );
  }
  assignTaskAsync(params: {
    idTask: number;
    uidUser: string;
  }): Observable<UpdateTaskDTO> {
    return this.http.put<UpdateTaskDTO>(
      environment.urlApiProjects +
        'Task/AssignTask/ID?idTask=' +
        params.idTask +
        '&uidUser=' +
        params.uidUser,
      params
    );
  }
  completeTaskAsync(idTask: number): Observable<UpdateTaskDTO> {
    return this.http.put<UpdateTaskDTO>(
      environment.urlApiProjects + 'Task/CompleteTask/ID?idTask=' + idTask,
      idTask
    );
  }
}
