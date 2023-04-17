import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { TaskModel } from 'src/domain/models/task/task.model';

export class GetUnassignedTasksUseCase implements UseCase<string, TaskModel[]> {
  constructor(private taskRepository: TaskRepository) {}

  execute(idLeader: string): Observable<TaskModel[]> {
    return this.taskRepository.getUnassignedTasksAsync(idLeader);
  }
}
