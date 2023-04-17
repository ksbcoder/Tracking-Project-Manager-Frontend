import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { TaskModel } from 'src/domain/models/task/task.model';

export class GetTasksByUserIdUseCase implements UseCase<string, TaskModel[]> {
  constructor(private taskRepository: TaskRepository) {}

  execute(uidUser: string): Observable<TaskModel[]> {
    return this.taskRepository.getTasksByUserIdAsync(uidUser);
  }
}
